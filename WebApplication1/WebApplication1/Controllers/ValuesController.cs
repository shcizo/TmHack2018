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
using WebApplication1.Models;

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
      List<BacklogWorkItems> backlogWorkItemsList = new List<BacklogWorkItems>();

        foreach(var workItem in result.WorkItems)
        {
        BacklogWorkItems backlogWorkItem = new BacklogWorkItems();
        backlogWorkItem.Id = workItem.Target.Id;
        var completeWorkitem = await _service.GetWorkItemByID(backlogWorkItem.Id);
        backlogWorkItem.Title = completeWorkitem.Fields["System.Title"].ToString();
        backlogWorkItemsList.Add(backlogWorkItem);
        }
      
        return Ok(backlogWorkItemsList);
    }

    // GET api/values/5
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
      var result = await _service.GetWorkItemByID(id);
      WorkItemModel wim = new WorkItemModel();
      wim.Id = result.Id;
      wim.Title = result.Fields["System.Title"].ToString();
     // wim.RemainingTime = Convert.ToInt32(result.Fields["Microsoft.VSTS.Scheduling.RemainingWork"]);
      wim.url = result.Url;
      return Ok(wim);
    }

    // POST api/values
    [HttpPost]
    public void Post([FromBody]string value)
    {
    }

    // PUT api/values/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id)
    {
      var result = await _service.UpdateWorkItem(17287);
      return Ok(result);
    }

    // DELETE api/values/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
