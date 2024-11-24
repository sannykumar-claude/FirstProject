using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace First_project.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PlayController : ControllerBase
    {
        [HttpGet("get-players")]
        public IActionResult players()
        {
            return Ok(new JsonResult(new {message="Only authorize user can view players"}));
        }
    }
}
