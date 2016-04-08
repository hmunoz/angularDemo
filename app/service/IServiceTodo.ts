export interface IServiceTodo<T> {
    getAll(): any;
    delete(id: string): any;
    add(entity: T): any;
}