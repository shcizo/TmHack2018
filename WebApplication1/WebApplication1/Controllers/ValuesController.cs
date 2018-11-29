using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.TeamFoundation.WorkItemTracking.WebApi;
using Microsoft.TeamFoundation.WorkItemTracking.WebApi.Models;
using Microsoft.TeamFoundation.Work.WebApi;
using Microsoft.VisualStudio.Services.Common;
using Microsoft.VisualStudio.Services.WebApi;
using Microsoft.TeamFoundation.Core.WebApi.Types;
using WebApplication1.Services;
using Microsoft.AspNetCore.Cors;

namespace WebApplication1.Controllers
{
  [EnableCors("AllowCors")]
  [Route("api/[controller]")]
  public class ValuesController : Controller
  {
    private readonly iVstsService _service;

    public ValuesController(iVstsService service)
    {
     _service = service;
    }
    // GET api/values
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var result = await _service.GetActiveBacklogs();
        return Ok(result);
    }

    // GET api/values/5
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
      var result = await _service.GetWorkItemByID(id);
      return Ok(result);
    }

    // POST api/values
    [HttpPost]
    public void Post([FromBody]string value)
    {
    }

    // PUT api/values/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody]string value)
    {
    }

    // DELETE api/values/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
