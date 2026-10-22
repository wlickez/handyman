using HandyMan.API.Interfaces;
using HandyMan.API.Models;
using HandyMan.API.Models.Helpers;
using HandyMan.API.Models.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HandyMan.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProvidersController(IDBService<HandymanProvider> dbService) : ControllerBase
    {
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateProviderRequest provider)
        {
            try
            {
                string result = await dbService.InsertEntity(
                    "insert into [HANDYMAN.PROVIDER] " +
                    "(FirstName, LastName, PhoneNumber1, PhoneNumber2, DocumentId, Nit, Email, StatusId) " +
                    "values (@firstName, @lastName, @phoneNumber1, @phoneNumber2, @documentId, @nit, @email, 1)",
                    false,
                    [
                        new ParametroSql("@firstName", provider.FirstName),
                        new ParametroSql("@lastName", provider.LastName),
                        new ParametroSql("@phoneNumber1", provider.PhoneNumber1),
                        new ParametroSql("@phoneNumber2", provider.PhoneNumber2),
                        new ParametroSql("@documentId", provider.DocumentId),
                        new ParametroSql("@nit", provider.Nit),
                        new ParametroSql("@email", provider.Email)
                    ],
                    null);

                if (!string.IsNullOrEmpty(result))
                    return StatusCode(503, new ResponseBuilder<string>()
                        .SetSuccess(false)
                        .SetMessage(result)
                        .SetResult([""])
                        .Build());

                return Ok(new ResponseBuilder<string>()
                    .SetSuccess(true)
                    .SetMessage("Proveedor creado correctamente.")
                    .SetResult([""])
                    .Build());
            }
            catch (Exception ex)
            {
                return StatusCode(503, new ResponseBuilder<string>()
                    .SetSuccess(false)
                    .SetMessage(ex.Message)
                    .SetResult([""])
                    .Build());
            }
        }
    }
}
