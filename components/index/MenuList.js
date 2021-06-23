import MenuListItem from './MenuListItem';

export default function MenuList() {
    return (
        <div className="list-group">
            <MenuListItem url={'/datapoints?dataType=blood_pressure'} title={'Blood Pressure'} />
            <MenuListItem url={'/datapoints?dataType=weight'} title={'Weight'} />
            <MenuListItem url={'/datapoints'} title={'All datapoints'} />
        </div>
    );
};
