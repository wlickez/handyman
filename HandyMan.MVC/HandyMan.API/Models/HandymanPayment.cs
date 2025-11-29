using System;
using System.Collections.Generic;

namespace HandyMan.API.Models;

public partial class HandymanPayment
{
    public long Id { get; set; }

    public string Description { get; set; } = null!;

    public int StatusId { get; set; }

    public virtual ICollection<HandymanTask> HandymanTasks { get; set; } = new List<HandymanTask>();

    public virtual HandymanStatus Status { get; set; } = null!;
}
