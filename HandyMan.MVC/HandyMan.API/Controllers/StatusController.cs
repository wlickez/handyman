using HandyMan.API.Interfaces;
using HandyMan.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HandyMan.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        IConfiguration _configuration;
        IDBService<HandymanStatus> _dBService;
        public StatusController(IConfiguration configuration, IDBService<HandymanStatus> dBService)
        {
            _configuration = configuration;
            _dBService = dBService;
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetStatuses()
        {
            var statuses = await _dBService.SelectEntity("select * from [HANDYMAN.STATUS]", false, null, null);
            return Ok(statuses);
        }

    }
}
