using HandyMan.API.Interfaces;
using HandyMan.API.Models;
using HandyMan.API.Models.Helpers;
using HandyMan.API.Models.Request;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using System.Net.NetworkInformation;

namespace HandyMan.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        IConfiguration _configuration;
        IDBService<HandymanUser> _dBService;
        Response<string> _response;

        public LoginController(IConfiguration configuration, IDBService<HandymanUser> dBService)
        {
            _configuration = configuration;
            _dBService = dBService;
           
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest user)
        {
            try
            {
                string sql = "select * " +
                    "from [HANDYMAN.USER] u " +
                    "where u.Email = @email " +
                    "AND u.Password = @password";

                List<ParametroSql> parametros = new List<ParametroSql>
                {
                    new ParametroSql("@email", user.Email),
                    new ParametroSql("@password", user.Password)
                };
                var userExist = (await _dBService.SelectEntity(sql, false, parametros, null)).FirstOrDefault();

                string jwtToken = string.Empty;

                _response = new ResponseBuilder<string>().SetSuccess(false)
                            .SetMessage("Something wrong happend. ")
                            .SetResult([""])
                            .Build();

                if (userExist == null)
                    return NotFound(_response);

                _response = new ResponseBuilder<string>()
                            .SetMessage("Login successful. ")
                            .SetResult([jwtToken])
                            .SetSuccess(true)
                            .Build() ;
                            
                return Ok(_response);
            }
            catch (Exception ex)
            {
                return StatusCode(503, new ResponseBuilder<HandymanStatus>().SetMessage(ex.Message).Build());
            }
        }
    }
}
