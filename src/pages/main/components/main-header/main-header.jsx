import './main-header.css';

function MainHeader() {
    return(
        <header className="header">
            <span className="sprint-name">Spint 123</span>
            <span className="sprint-date">14.06 - 17.07</span>
            <div className="sprint-legend">
                <div className="flex-row ">
                    <div className="circle yellow"></div>
                    Has already expired
                </div>
                <div className="flex-row">
                    <div className="circle green"></div>
                    Completed
                </div>
                <div className="flex-row">
                    <div className="circle red"></div>
                    Canceled
                </div>
            </div>
        </header>
    )
}

export default MainHeader;