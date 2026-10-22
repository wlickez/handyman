using HandyMan.API.Interfaces;
using HandyMan.API.Models;
using HandyMan.API.Models.Helpers;
using HandyMan.API.Models.Request;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryRequest category)
        {
            try
            {
                string result = await _dBService.InsertEntity(
                    "insert into [HANDYMAN.TASK_CATEGORY] (Description, Icon, StatusId) " +
                    "values (@description, @icon, 1)",
                    false,
                    [
                        new ParametroSql("@description", category.Description),
                            new ParametroSql("@icon", category.Icon)
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
                    .SetMessage("Categoría creada correctamente.")
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
