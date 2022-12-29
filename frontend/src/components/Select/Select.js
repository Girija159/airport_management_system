import styles from './Select.module.css';

const Select = props => {
    const onChange = event => {
        if(props.onChange) {
            props.onChange(event.target.value);
        }
    };

    return (
        <div className={styles["select-wrap"]}>
            <label> {props.label} </label>
            <select name={props.name} onChange={onChange}>
                {props.options.map((option, i) => { 
                    return <option key={i} value={option}> {option} </option>
                })}
            </select>
        </div>
    );
};

export default Select;
