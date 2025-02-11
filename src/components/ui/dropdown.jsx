function DropDown({ children }) {
    return (
        <div className="dropdown dropdown-right dropdown-center">
            {children}
        </div>
    );
}

function DropDownTrigger({ children }) {
    return (
        <div tabIndex="0" role="button" className="btn btn-circle btn-sm btn-soft btn-primary mx-1" data-testid="map-picker">
            {children}
        </div>
    );
}

function DropDownContent({ children }) {
    return (
        <div tabIndex="0" className="dropdown-content bg-base-100 rounded-box w-100 shadow-sm">
            {children}
        </div>
    );
}

export { DropDown, DropDownTrigger, DropDownContent };
