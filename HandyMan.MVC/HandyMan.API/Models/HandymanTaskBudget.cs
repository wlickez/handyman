using System;
using System.Collections.Generic;

namespace HandyMan.API.Models;

public partial class HandymanTaskBudget
{
    public long Id { get; set; }

    public long TaskId { get; set; }

    public string Description { get; set; } = null!;

    public decimal Amout { get; set; }

    public byte[]? Document { get; set; }

    public virtual HandymanTask Task { get; set; } = null!;
}
