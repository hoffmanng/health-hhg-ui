import MenuListItem from './MenuListItem';

export default function MenuList() {
    return (
        <div className="list-group">
            <MenuListItem url={'/datapoints?dataType=blood_pressure'} title={'Blood Pressure'} subTitle={'Last: 120 / 80 mmHg (2021-01-01)'} />
            <MenuListItem url={'/datapoints?dataType=weight'} title={'Weight'} subTitle={'Last: 70 kg (2021-01-01)'} />
            <MenuListItem url={'/datapoints'} title={'All datapoints'} />
        </div>
    );
};
