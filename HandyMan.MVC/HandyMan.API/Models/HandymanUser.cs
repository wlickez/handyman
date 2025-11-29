using System;
using System.Collections.Generic;

namespace HandyMan.API.Models;

public partial class HandymanUser
{
    public long Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string PhoneNumber1 { get; set; } = null!;

    public string? PhoneNumber2 { get; set; }

    /// <summary>
    /// DPI-CUI
    /// </summary>
    public string DocumentId { get; set; } = null!;

    public string Nit { get; set; } = null!;

    public string Email { get; set; } = null!;

    public int StatusId { get; set; }

    public DateTime? LastDateTask { get; set; }

    public virtual ICollection<HandymanContract> HandymanContracts { get; set; } = new List<HandymanContract>();

    public virtual ICollection<HandymanTask> HandymanTasks { get; set; } = new List<HandymanTask>();

    public virtual HandymanStatus Status { get; set; } = null!;
}
