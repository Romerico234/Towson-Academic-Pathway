
import Collapse from "./CollapseComponent";
import CollapseInfo from "./CollapseInfoComponent";

function Settings() {
    //ToDO - Get Data pass it into a collpaseInfo Comp with title and ex. data={PersonalInfo.fname}
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Collapse title="Personal Information">
        <CollapseInfo title="First Name" data={""}/>
        <CollapseInfo title="Last Name"/>
        <CollapseInfo title="Email"/>
        <CollapseInfo title="Bachelor's Degree"/>
        <CollapseInfo title="Major"/>
        <CollapseInfo title="Expected Graduation"/>
        <CollapseInfo title="Honors College?" />
      </Collapse>
      <Collapse title="Preferences">
        <CollapseInfo title="Preferred Credit Hours" data={""}/>
        <CollapseInfo title="Unavailable Terms"/>
        <CollapseInfo title="Additional Preferences"/>
      </Collapse>
    </div>
  );
};

export default Settings;