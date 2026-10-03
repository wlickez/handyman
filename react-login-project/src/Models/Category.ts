class Category {
    id: number;
    description: string;
    statusId: number;
    icon: string;

    constructor(id: number, description: string, statusId: number, icon: string) {
        this.id = id;
        this.description = description;
        this.statusId = statusId;
        this.icon = icon;
    }
}

export default Category;