using HandyMan.API.Interfaces;
using HandyMan.API.Models;
using HandyMan.API.Models.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HandyMan.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        IConfiguration _configuration;
        IDBService<HandymanTaskCategory> _dBService;
        Response<HandymanTaskCategory> _response;
        public CategoriesController(IConfiguration configuration, IDBService<HandymanTaskCategory> dBService)
        {
            _dBService = dBService;
            _configuration = configuration;
        }
        [HttpGet]
        public async Task<IActionResult> GetCategories(int top = 10)   
        {
            try
            {
                // Implement logic to retrieve categories from the database
                var categories = await _dBService.SelectEntity($"SELECT top ({top}) * FROM [HANDYMAN.TASK_CATEGORY] WHERE StatusId = 1 ORDER BY Description", false, null, null);

                _response = new ResponseBuilder<HandymanTaskCategory>()
                    .SetSuccess(true)
                    .SetMessage("Categories retrieved successfully")
                    .SetResult(categories.ToList())
                    .Build();
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return StatusCode(503, new ResponseBuilder<HandymanTaskCategory>().SetMessage(ex.Message).Build());
            }
        }
    }
}
