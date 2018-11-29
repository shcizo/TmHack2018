using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class WorkItemModel
    {
      public int? Id { get; set; }

      public string Title { get; set; }

      public int RemainingTime { get; set; }

      public string url { get; set; }

      public ChangedBy  changedBy { get; set; }
    }
}
