
class Identity {
    public id: number;
}

export abstract class PageListingComponentBase<T extends Identity>  {
    
    // private items: Array<T>;
    public pageSize = 10;
    public pageNumber = 1;
    public isTableLoading = false;
    public totalItems;
    public total;
    public search: string = '';

    public busy = false;

    constructor(){
        // this.items = [];
    }

    public abstract refresh();
    public abstract addOrEdit(entity: T);
    public abstract delete(entity: T);
    public abstract onPageChange(page: number);
    // delete(id: number){
    //     let index = this.items.findIndex(i => i.id === id);
    //     if(index != -1)
    //         this.items.slice(index, 1);

    //     // Index out of bounds exception.
    //     throw new Error("Index out of bounds");
    // }

}