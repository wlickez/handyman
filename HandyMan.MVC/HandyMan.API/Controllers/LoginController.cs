using HandyMan.API.Interfaces;
using HandyMan.API.Models;
using HandyMan.API.Models.Helpers;
using HandyMan.API.Models.Request;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.NetworkInformation;
using System.Security.Claims;
using System.Text;

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

                

                _response = new ResponseBuilder<string>().SetSuccess(false)
                            .SetMessage("Something wrong happend. ")
                            .SetResult([""])
                            .Build();

                if (userExist == null)
                    return NotFound(_response);

                string jwtToken = GenerarToken(userExist.Email);
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

        private string GenerarToken(string usuario)
        {
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])
            );

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, usuario)
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(_configuration.GetValue<double>("Jwt:DurationInHours")),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
