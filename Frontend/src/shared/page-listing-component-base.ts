
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

    public busy = false;

    constructor(){
        // this.items = [];
    }

    protected abstract refresh();
    protected abstract addOrEdit(entity: T);
    protected abstract delete(entity: T);
    protected abstract onPageChange(page: number);
    // delete(id: number){
    //     let index = this.items.findIndex(i => i.id === id);
    //     if(index != -1)
    //         this.items.slice(index, 1);

    //     // Index out of bounds exception.
    //     throw new Error("Index out of bounds");
    // }

}