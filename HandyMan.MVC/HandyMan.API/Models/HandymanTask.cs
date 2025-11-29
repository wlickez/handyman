using System;
using System.Collections.Generic;

namespace HandyMan.API.Models;

public partial class HandymanTask
{
    public long Id { get; set; }

    public string Description { get; set; } = null!;

    public string? Description2 { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime? CompletedDate { get; set; }

    public int StatusId { get; set; }

    public int TaskCategoryId { get; set; }

    public long UserId { get; set; }

    public long? ProviderId { get; set; }

    public long? PaymentId { get; set; }

    public long? ContractId { get; set; }

    public virtual HandymanContract? Contract { get; set; }

    public virtual ICollection<HandymanContract> HandymanContracts { get; set; } = new List<HandymanContract>();

    public virtual ICollection<HandymanTaskBudget> HandymanTaskBudgets { get; set; } = new List<HandymanTaskBudget>();

    public virtual HandymanPayment? Payment { get; set; }

    public virtual HandymanProvider? Provider { get; set; }

    public virtual HandymanStatus Status { get; set; } = null!;

    public virtual HandymanTaskCategory TaskCategory { get; set; } = null!;

    public virtual HandymanUser User { get; set; } = null!;
}
