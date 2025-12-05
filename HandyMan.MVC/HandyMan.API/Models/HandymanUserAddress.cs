using System;
using System.Collections.Generic;

namespace HandyMan.API.Models;

public partial class HandymanUserAddress
{
    public long UserId { get; set; }

    public long AddresId { get; set; }

    public virtual HandymanAddress Addres { get; set; } = null!;

    public virtual HandymanUser AddresNavigation { get; set; } = null!;
}
