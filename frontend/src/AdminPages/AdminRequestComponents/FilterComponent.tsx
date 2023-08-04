import "./RequestsTable.css";

function FilterComponent(props: any) {

    const filterStateHandler = (event: any) => {
        props.filterHandler(event.target.value);
    }

    return(
        <div className="filter" style={{ minWidth:'150px' }}>
            <select className="filter__select" onChange={filterStateHandler}>
                <option value="Pending" className="select__items">Onay Bekleyen</option>
                <option value="Approved" className="select__items">Onaylanmış</option>
                <option value="Rejected" className="select__items">Reddedilmiş</option>
                <option value="All" className="select__items">Tümü</option>
            </select>
        </div>
    );
}

export default FilterComponent;