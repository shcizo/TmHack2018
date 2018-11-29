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

namespace WebApplication1.Controllers
{
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
    public IActionResult Get()
    {
        Uri accountUri = new Uri("https://ntmedia.visualstudio.com");     // Account URL, for example: https://fabrikam.visualstudio.com                
        String personalAccessToken = "rwvch6m3b6dwq2cenjwsy3ik6uo2l3ww3qvewbvhtoetzy3spijq";  // See https://www.visualstudio.com/docs/integrate/get-started/authentication/pats                

        // Create a connection to the account
        VssConnection connection = new VssConnection(accountUri, new VssBasicCredential(string.Empty, personalAccessToken));

        WorkHttpClient whc = connection.GetClient<WorkHttpClient>();

        TeamContext tc = new TeamContext("DFS");
        tc.Team = "DFS Team";

        var backlogLevelWorkItem = whc.GetBacklogLevelWorkItemsAsync(tc, "Microsoft.TaskCategory").Result;
      

        return Ok(backlogLevelWorkItem.WorkItems);

    }

    // GET api/values/5
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        int workItemId = id;   // ID of a work item, for example: 12

      // Create a connection to the account

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
