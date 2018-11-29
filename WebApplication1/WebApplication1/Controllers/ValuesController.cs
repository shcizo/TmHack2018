using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.TeamFoundation.WorkItemTracking.WebApi;
using Microsoft.TeamFoundation.WorkItemTracking.WebApi.Models;
using Microsoft.VisualStudio.Services.Common;
using Microsoft.VisualStudio.Services.WebApi;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        // GET api/values
        [HttpGet]
        public IActionResult Get()
        {
          return Ok();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            Uri accountUri = new Uri("https://ntmedia.visualstudio.com");     // Account URL, for example: https://fabrikam.visualstudio.com                
            String personalAccessToken = "rwvch6m3b6dwq2cenjwsy3ik6uo2l3ww3qvewbvhtoetzy3spijq";  // See https://www.visualstudio.com/docs/integrate/get-started/authentication/pats                
            int workItemId = int.Parse(id);   // ID of a work item, for example: 12

            // Create a connection to the account
            VssConnection connection = new VssConnection(accountUri, new VssBasicCredential(string.Empty, personalAccessToken));

            WorkItemTrackingHttpClient witClient = connection.GetClient<WorkItemTrackingHttpClient>();

            WorkItem workitem = witClient.GetWorkItemAsync(workItemId).Result;

            return Ok(workitem.Fields);
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
