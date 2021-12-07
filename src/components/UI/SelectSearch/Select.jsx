import './Select.scss'
import { Fragment, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import normalize from '../../../utils/normalize'

import useOnclickOutside from "react-cool-onclickoutside"


const Select = ({ options, label = 'Label', value, setValue, ...rest }) => {
    const [input, setInput] = useState('')
    const [checked, setChecked] = useState('')
    const [results, setResults] = useState(options)

    const [openMenu, setOpenMenu] = useState(false)

    useEffect(() => {

        if(value === 0){
            setInput('')
        }
        
    }, [value])

    const ref = useOnclickOutside(() => {
        setOpenMenu(false)
    })

    useEffect(() => {
        if (options) {
            const handleSearch = () => {
                let temp = {}
                const normalizedInput = normalize(input)

                Object.keys(options).forEach(e => {
                    const normalizedObject = normalize(`${e} ${options[e]}`)

                    if (normalizedObject.includes(normalizedInput)) {
                        temp = {
                            ...temp,
                            [e]: options[e]
                        }
                    }
                })
                setResults(temp)
            }
            handleSearch()
        }
    }, [input, options]) // eslint-disable-line react-hooks/exhaustive-deps

    return (

        <div className="custom-select-wrapper">
            <div className="custom-select">
                <input {...rest}
                    type="text"
                    ref={ ref }
                    onChange={e => setInput(e.target.value)}
                    onFocus={() => setChecked(true)}
                    onBlur={() => {
                        setChecked(false)
                        if (input === '') {
                            setValue(0)
                            setInput('')
                        } else {
                            setInput(options[value] || '')
                        }
                    }}
                    value={input}
                />

                <label className={openMenu || value.length > 0 ? 'active' : ''}>{label}</label>

                <span className="material-icons-outlined icon">
                    {
                        checked > 0
                            ? 'expand_less'
                            : 'expand_more'
                    }
                </span>

            </div>


            {
                checked > 0
                    ?
                    <div className="drop-down">
                        {
                            Object.keys(results).length > 0
                                ?
                                <Fragment>
                                    {
                                        Object.keys(results).map(e => (
                                            <li
                                                key={uuid()}
                                                onMouseDown={() => {
                                                    setInput(options[e])
                                                    setValue(e)
                                                }}
                                            >
                                                {options[e]}
                                            </li>
                                        ))
                                    }
                                </Fragment>
                                :
                                <div>Sin resultados...</div>
                        }
                    </div>
                    :
                    null
            }

        </div>
    )
}

export default Select
