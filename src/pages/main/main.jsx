import './main.css';
// components
import MainHeader from '../../components/main-header/main-header';
import MainFooter from '../../components/main-footer/main-footer';
import IssueTable from '../../components/issue-table/issue-table';

function Main() {

    return(
        <div className="main-container">
            <MainHeader />
            <IssueTable />
            <MainFooter />
        </div>
    )
}

export default Main;