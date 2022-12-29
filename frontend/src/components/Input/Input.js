import styles from './Input.module.css';

const Input = props => {
    return (
       <div className={`${styles['form-control']}`}> 
            <label> {props.label} </label>
            <input className={styles[props.inputClassName]} type={props.type} name={props.name} value={props.value} required={props.required} disabled={props.disabled} />
        </div>
    );
};

export default Input;