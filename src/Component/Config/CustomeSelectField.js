import React from 'react'
import { Autocomplete, Box, TextField } from '@mui/material'
import { ContainerOfInputFields, ContainerOfSelectField } from './ThemDesign'
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux'
// import * as RiIcons from 'react-icons/ri'
import { DisabledByDefault, KeyboardArrowUp } from '@mui/icons-material';
function CustomeSelectField({
    label, error, message, value, onChange, onClearClick, readOnly,
    list, haswidth, customGetOptionLabel, multiple, margin, focused, renderOption, onSearch, limits,
    customHeight, customPadding, ...props
}) {
    const maintheme = useSelector(state=>state?.ThemeData?.maintheme);
    return (
        <ContainerOfSelectField
            mainTheme={maintheme}
            customeWidth={props?.customWidth ? props?.customWidth : "100%"}
            isForm={true}
            haswidth={haswidth ? true : false}
            hasError={error}
            customHeight={customHeight}
            customPadding={customPadding}
        >
            <Box
                sx={{
                    position: "relative",
                    // margin: "5px 0",
                    margin: margin ? margin : 'none',
                    width: "100%",
                    backgroundColor: "#fff",
                }}
                className="orderdata"
            >
                <Autocomplete
                    // disablePortal
                    key={props?.key}
                    id="combo-box-demo"
                    options={list ? list : []}
                    value={value}
                    onChange={(e, newValue) => {
                        onChange && onChange(e, newValue)
                    }}
                    onInputChange={onSearch ? onSearch : () => { }}
                    getOptionLabel={customGetOptionLabel ? customGetOptionLabel : ((option) => {

                        return option?.name
                    }) || ''}
                    popupIcon={readOnly?null:<KeyboardArrowUp/>}
                    aria-required={props?.required?props.required:false}
                    limitTags={limits && limits > 0 ? limits : -1}
                    disabled={props?.disabled ? props.disabled : false}
                    readOnly={readOnly}
                    InputProps={{
                        readOnly: readOnly,
                        required:props?.required?props.required:false,
                    }}
                    // open={props?.open}
                    // setOpen={props?.setOpen}
                multiple={multiple}
                renderOption={renderOption}
                
                clearIcon={<CloseIcon sx={{ fontSize: '20px', color: maintheme?.iconColor }} onClick={() => onClearClick && onClearClick()} />}
                renderInput={(params) => <TextField
                    {...params}
                    label={<span>{label} {props?.required?<span style={{color:'red'}}>*</span>:''}</span>}
                    placeholder={props?.placeHolder ? props.placeHolder : ''}
                    variant="filled"
                    disabled={props?.disabled ? props.disabled : false}
                    // required={props?.required ? props.required : false}
              
                />}
                className={`${error ? 'Mui-focused errors' : ''} ${focused ? 'Mui-focused' : ''}`}
                />
            </Box>
            {
                error && message?.length ?
                    <Box sx={{
                        height: 'fit-content',
                        padding: '5px',
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'wrap',
                        width: '95%',
                    }}>
                        {
                            message && message?.length > 0 ? message?.map((messg) => (
                                <span style={{ fontFamily: 'Cairo-Bold', fontSize: '14px', color: 'red', height: 'auto' }}>{messg}</span>
                            )) : null
                        }
                    </Box> : null}
        </ContainerOfSelectField>
    )
}

export default CustomeSelectField