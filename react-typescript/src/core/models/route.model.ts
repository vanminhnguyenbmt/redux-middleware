type RouteType = {
    name: string,
    exact: boolean,
    path: string,
    main: (props: any) => JSX.Element
};

export default RouteType;