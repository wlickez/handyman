using System;
using System.Collections.Generic;

namespace HandyMan.API.Models;

public partial class HandymanContract
{
    public long Id { get; set; }

    public long UserId { get; set; }

    public long ProviderId { get; set; }

    public long TaskId { get; set; }

    public string OriginalText { get; set; } = null!;

    public DateTime CreatedDate { get; set; }

    public byte[]? SignedFile { get; set; }

    public int StatusId { get; set; }

    public virtual ICollection<HandymanTask> HandymanTasks { get; set; } = new List<HandymanTask>();

    public virtual HandymanProvider Provider { get; set; } = null!;

    public virtual HandymanStatus Status { get; set; } = null!;

    public virtual HandymanTask Task { get; set; } = null!;

    public virtual HandymanUser User { get; set; } = null!;
}
