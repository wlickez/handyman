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
    public class ServicesController (
        IConfiguration configuration,
        IDBService<HandymanTask> dbService,
        IDBService<HandymanUser> userDbService
        ) : ControllerBase
    {
        IConfiguration _configuration = configuration;
        IDBService<HandymanTask> _dBService = dbService;
        IDBService<HandymanUser> _userDbService = userDbService;
        Response<HandymanTask> _response;

        [HttpGet]
        public async Task<IActionResult> Get(int top = 10, CancellationToken cancellationToken = default)
        {
            try
            {
                var tasks = await _dBService.SelectEntity($"SELECT TOP ({top}) * " +
                    $"FROM [HANDYMAN.TASK] " +
                    $"WHERE StatusId = 4 ", false, null, null);

                _response = new ResponseBuilder<HandymanTask>()
                    .SetSuccess(true)
                    .SetMessage($"Categories retrieved successfully ({tasks.Count()})")
                    .SetResult(tasks.ToList())
                    .Build();

                return Ok(_response);

            }
            catch (Exception ex)
            {
                return StatusCode(503, new ResponseBuilder<HandymanTask>().SetMessage(ex.Message).Build());
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateServiceRequest service)
        {
            try
            {
                var email = User.Identity?.Name;
                if (string.IsNullOrWhiteSpace(email))
                    return Unauthorized();

                var user = (await _userDbService.SelectEntity(
                    "select Id from [HANDYMAN.USER] where Email = @email",
                    false,
                    [new ParametroSql("@email", email)],
                    null)).FirstOrDefault();

                if (user == null)
                    return Unauthorized();

                string result = await _dBService.InsertEntity(
                    "insert into [HANDYMAN.TASK] " +
                    "(Description, CreatedDate, StatusId, TaskCategoryId, UserId) " +
                    "values (@description, GETDATE(), 4, @taskCategoryId, @userId)",
                    false,
                    [
                        new ParametroSql("@description", service.Description),
                        new ParametroSql("@taskCategoryId", service.TaskCategoryId),
                        new ParametroSql("@userId", user.Id)
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
                    .SetMessage("Servicio creado correctamente.")
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
