using Microsoft.TeamFoundation.Core.WebApi.Types;
using Microsoft.TeamFoundation.Work.WebApi;
using Microsoft.TeamFoundation.WorkItemTracking.WebApi;
using Microsoft.TeamFoundation.WorkItemTracking.WebApi.Models;
using Microsoft.VisualStudio.Services.Common;
using Microsoft.VisualStudio.Services.WebApi;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Services
{
  public interface iVstsService
  {
    Task<WorkItem> GetWorkItemByID(int workItemId);
    Task<BacklogLevelWorkItems> GetActiveBacklogs();
  }
  public class VstsService: iVstsService
  {
    WorkItemTrackingHttpClient witClient;
    WorkHttpClient whClient;
    public VstsService()
    {
      Uri accountUri = new Uri("https://ntmedia.visualstudio.com");     // Account URL, for example: https://fabrikam.visualstudio.com                
      String personalAccessToken = "rwvch6m3b6dwq2cenjwsy3ik6uo2l3ww3qvewbvhtoetzy3spijq";  // See https://www.visualstudio.com/docs/integrate/get-started/authentication/pats                

      VssConnection connection = new VssConnection(accountUri, new VssBasicCredential(string.Empty, personalAccessToken));
      witClient = connection.GetClient<WorkItemTrackingHttpClient>();
      whClient = connection.GetClient<WorkHttpClient>();

    }

    public async Task<WorkItem> GetWorkItemByID(int workItemId)
    {
      WorkItem workitem = await witClient.GetWorkItemAsync(workItemId);
      return workitem;
    }

    public async Task<BacklogLevelWorkItems> GetActiveBacklogs()
    {
      TeamContext tc = new TeamContext("DFS");
      tc.Team = "DFS Team";

      BacklogLevelWorkItems backlogLevelWorkItem = await whClient.GetBacklogLevelWorkItemsAsync(tc, "Microsoft.TaskCategory");
      return backlogLevelWorkItem;
    }
  }
}
