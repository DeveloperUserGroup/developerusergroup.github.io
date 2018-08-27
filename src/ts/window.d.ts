export { };
declare global {
    interface Window { 
        loadEvents: any,
        dataLayer: Array<any>,
        myLazyLoad: ILazyLoad,
        version: String, 
    }
}