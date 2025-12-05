using System;
using System.Collections.Generic;

namespace HandyMan.API.Models;

public partial class HandymanAddress
{
    public long Id { get; set; }

    public string Address { get; set; } = null!;

    public int StatusId { get; set; }
}
