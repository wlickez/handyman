using System;
using System.Collections.Generic;

namespace HandyMan.API.Models;

public partial class HandymanStatus
{
    public int Id { get; set; }

    public string Description { get; set; } = null!;

    public virtual ICollection<HandymanContract> HandymanContracts { get; set; } = new List<HandymanContract>();

    public virtual ICollection<HandymanPayment> HandymanPayments { get; set; } = new List<HandymanPayment>();

    public virtual ICollection<HandymanProvider> HandymanProviders { get; set; } = new List<HandymanProvider>();

    public virtual ICollection<HandymanTaskCategory> HandymanTaskCategories { get; set; } = new List<HandymanTaskCategory>();

    public virtual ICollection<HandymanTask> HandymanTasks { get; set; } = new List<HandymanTask>();

    public virtual ICollection<HandymanUser> HandymanUsers { get; set; } = new List<HandymanUser>();
}
