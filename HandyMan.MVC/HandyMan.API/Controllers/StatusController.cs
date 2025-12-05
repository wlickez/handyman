using HandyMan.API.Interfaces;
using HandyMan.API.Models;
using HandyMan.API.Models.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Migrations.Operations;

namespace HandyMan.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        IConfiguration _configuration;
        IDBService<HandymanStatus> _dBService;
        Response<HandymanStatus> _response;
        public StatusController(IConfiguration configuration, IDBService<HandymanStatus> dBService)
        {
            _configuration = configuration;
            _dBService = dBService;            
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetStatuses()
        {
            try
            {                
                var statuses = await _dBService.SelectEntity("select * from [HANDYMAN.STATUS]", false, null, null);
                _response = new ResponseBuilder<HandymanStatus>().SetSuccess(true)
                            .SetMessage("Statuses retrieved successfully")
                            .SetResult(statuses.ToList())                            
                            .Build();
                return Ok(_response);
            }
            catch (Exception ex)
            {
               return StatusCode(503, new ResponseBuilder<HandymanStatus>().SetMessage(ex.Message).Build());
            }
        }

        [HttpPut("put")]
        public async Task<IActionResult> PutStatus([FromBody] HandymanStatus status)
        {
            try
            {
                List<ParametroSql> parametros = new List<ParametroSql>
                {
                    new ParametroSql("@id", status.Id),
                    new ParametroSql("@description", status.Description)
                };
                string result = await _dBService.UpdateEntity("update [HANDYMAN.STATUS] set Description = @description where Id = @id", false, parametros, null);

                if (!string.IsNullOrEmpty(result))
                    throw new Exception($"No se logró realizar la operación. {result}");
                _response = new ResponseBuilder<HandymanStatus>().SetSuccess(true).Build(); 
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response = new ResponseBuilder<HandymanStatus>().SetSuccess(false).SetMessage(ex.Message).Build();
                return StatusCode(503, _response);
            }
        }

        [HttpPost("post")]
        public async Task<IActionResult> PostStatus([FromBody] HandymanStatus status)
        {
            
            try
            {
                List<ParametroSql> parametros = new List<ParametroSql>
                {
                    new ParametroSql("@description", status.Description)
                };

                string result = await _dBService.InsertEntity("insert into [HANDYMAN.STATUS] (Description) values (@description)", false, parametros, null);

                if (!string.IsNullOrEmpty(result))
                    throw new Exception($"No se logró realizar la operación. {result}");

                _response = new ResponseBuilder<HandymanStatus>().SetSuccess(true).Build(); 
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response = new ResponseBuilder<HandymanStatus>().SetSuccess(false).SetMessage(ex.Message).Build();

                return StatusCode(503, _response);
            }
        }

    }
}
