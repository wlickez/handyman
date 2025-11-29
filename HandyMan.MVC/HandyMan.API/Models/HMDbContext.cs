using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace HandyMan.API.Models;

public partial class HMDbContext : DbContext
{
    private readonly IConfiguration _configuration;
    public HMDbContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public HMDbContext(IConfiguration configuration, DbContextOptions<HMDbContext> options)
        : base(options)
    {
        _configuration = configuration;
    }

    public virtual DbSet<HandymanContract> HandymanContracts { get; set; }

    public virtual DbSet<HandymanPayment> HandymanPayments { get; set; }

    public virtual DbSet<HandymanProvider> HandymanProviders { get; set; }

    public virtual DbSet<HandymanStatus> HandymanStatuses { get; set; }

    public virtual DbSet<HandymanTask> HandymanTasks { get; set; }

    public virtual DbSet<HandymanTaskBudget> HandymanTaskBudgets { get; set; }

    public virtual DbSet<HandymanTaskCategory> HandymanTaskCategories { get; set; }

    public virtual DbSet<HandymanUser> HandymanUsers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)

        => optionsBuilder.UseSqlServer(_configuration.GetValue<string>("AppSettings.ConnectionString"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<HandymanContract>(entity =>
        {
            entity.ToTable("HANDYMAN.CONTRACT");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.OriginalText).IsUnicode(false);

            entity.HasOne(d => d.Provider).WithMany(p => p.HandymanContracts)
                .HasForeignKey(d => d.ProviderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("CONTRACT_TO_PROVIDER");

            entity.HasOne(d => d.Status).WithMany(p => p.HandymanContracts)
                .HasForeignKey(d => d.StatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("CONTRACT_TO_STATUS");

            entity.HasOne(d => d.Task).WithMany(p => p.HandymanContracts)
                .HasForeignKey(d => d.TaskId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("CONTRACT_TO_TASK");

            entity.HasOne(d => d.User).WithMany(p => p.HandymanContracts)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("CONTRACT_TO_USER");
        });

        modelBuilder.Entity<HandymanPayment>(entity =>
        {
            entity.ToTable("HANDYMAN.PAYMENT");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Description)
                .HasMaxLength(150)
                .IsUnicode(false);

            entity.HasOne(d => d.Status).WithMany(p => p.HandymanPayments)
                .HasForeignKey(d => d.StatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("PAYMENT_TO_STATUS");
        });

        modelBuilder.Entity<HandymanProvider>(entity =>
        {
            entity.ToTable("HANDYMAN.PROVIDER");

            entity.HasIndex(e => e.Email, "IX_HANDYMAN.PROVIDER").IsUnique();

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.DocumentId)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Email)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.LastDateTask).HasColumnType("datetime");
            entity.Property(e => e.LastName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Nit)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PhoneNumber1)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PhoneNumber2)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Status).WithMany(p => p.HandymanProviders)
                .HasForeignKey(d => d.StatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("PROVIDER_TO_STATUS");
        });

        modelBuilder.Entity<HandymanStatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_HANDYMA.STATUS");

            entity.ToTable("HANDYMAN.STATUS");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Description)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<HandymanTask>(entity =>
        {
            entity.ToTable("HANDYMAN.TASK");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CompletedDate).HasColumnType("datetime");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Description2)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Contract).WithMany(p => p.HandymanTasks)
                .HasForeignKey(d => d.ContractId)
                .HasConstraintName("TASK_TO_CONTRACT");

            entity.HasOne(d => d.Payment).WithMany(p => p.HandymanTasks)
                .HasForeignKey(d => d.PaymentId)
                .HasConstraintName("TASK_TO_PAYMENT");

            entity.HasOne(d => d.Provider).WithMany(p => p.HandymanTasks)
                .HasForeignKey(d => d.ProviderId)
                .HasConstraintName("TASK_TO_PROVIDER");

            entity.HasOne(d => d.Status).WithMany(p => p.HandymanTasks)
                .HasForeignKey(d => d.StatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("TASK_TO_STATUS");

            entity.HasOne(d => d.TaskCategory).WithMany(p => p.HandymanTasks)
                .HasForeignKey(d => d.TaskCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("TASK_TO_TASK_CATEGORY");

            entity.HasOne(d => d.User).WithMany(p => p.HandymanTasks)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("TASK_TO_USER");
        });

        modelBuilder.Entity<HandymanTaskBudget>(entity =>
        {
            entity.HasKey(e => new { e.Id, e.TaskId });

            entity.ToTable("HANDYMAN.TASK_BUDGET");

            entity.Property(e => e.Amout).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Description).IsUnicode(false);

            entity.HasOne(d => d.Task).WithMany(p => p.HandymanTaskBudgets)
                .HasForeignKey(d => d.TaskId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("TASK_BUDGET_TO_TASK");
        });

        modelBuilder.Entity<HandymanTaskCategory>(entity =>
        {
            entity.ToTable("HANDYMAN.TASK_CATEGORY");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Status).WithMany(p => p.HandymanTaskCategories)
                .HasForeignKey(d => d.StatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("TASK_CATEGORY_TO_STATUS");
        });

        modelBuilder.Entity<HandymanUser>(entity =>
        {
            entity.ToTable("HANDYMAN.USER");

            entity.HasIndex(e => e.Email, "IX_HANDYMAN.USER").IsUnique();

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.DocumentId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasComment("DPI-CUI");
            entity.Property(e => e.Email)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.LastDateTask).HasColumnType("datetime");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Nit)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValue("CF", "DF_HANDYMAN.USER_Nit");
            entity.Property(e => e.PhoneNumber1)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PhoneNumber2)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Status).WithMany(p => p.HandymanUsers)
                .HasForeignKey(d => d.StatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("USER_TO_STATUS");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
