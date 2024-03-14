// used  material ui for form,stepper and icons and table
// used react-dropzone to upload docs and show file names ,added remove functionality of files
// added custom validations for form fields
// used material ui Grid to make it most responsive app
// used fetch to send and get data back in response
// used Material ui tel input to take phone numbers and allowed only +65
// used roboto as default font 
// Tried to replicate all the functionalities as per the main website reference
import { useState, } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import "./Home.css";
import logo from "../assets/logo/Credilinq.png"
import DoneIcon from '@mui/icons-material/Done';
import { MuiTelInput } from "mui-tel-input";
import Grid from '@mui/material/Grid';
import {
    ValidatorForm,
    TextValidator
} from "react-material-ui-form-validator";
import { useDropzone } from 'react-dropzone';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Description } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button, ButtonGroup, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { DataGrid } from '@mui/x-data-grid';
// Table Columns
const columns = [
    { field: 'id', headerName: 'ID', width: 70, sortable:  false,disableColumnMenu:true, },
    {
        field: 'companyUen',
        headerName: 'Company UEN',
        sortable:  false,disableColumnMenu:true,
        width: 160
    },
    {
        field: 'companyName',
        headerName: 'Company Name',
        width: 160,
        sortable:  false,
        disableColumnMenu:true
    },
    {
        field: 'fullName',
        headerName: 'Full Name',
        width: 160,
        sortable:  false,disableColumnMenu:true
    },
    {
        field: 'position',
        headerName: 'Position in Company',
        width: 160,
        sortable:  false,disableColumnMenu:true
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 160,
        sortable:  false,disableColumnMenu:true
    },
];

// applied theme here to override default
const theme = createTheme({
    components: {
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    fontFamily: 'Roboto',
                },
                contained: {
                    '&.Mui-disabled': {
                        color: 'gray',
                    },
                    '&:not(.Mui-disabled)': {
                        fontSize: '14px'
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    fontFamily: 'Roboto',
                    '& .MuiInputLabel-root': {
                        fontFamily: 'Roboto'
                    },
                    '& input': {
                        fontFamily: 'Roboto'
                    },
                    '& .MuiOutlinedInput-input': {
                        fontFamily: 'Roboto'
                    },
                    '& .Mui-error': {
                        fontFamily: 'Roboto',
                    },
                },
            },
        },
        MuiStepper: {
            styleOverrides: {
                root: {
                    fontFamily: 'Roboto',
                    '&.MuiStepIcon-text': {
                        fontFamily: 'Roboto',
                    },
                    '&.Mui-active': {
                        color: 'red !important'
                    },
                    '&.MuiSvgIcon-root': {
                        color: 'green',
                    },
                },
            },
        },
        checkbox: {
            color: '#007bff',
            '&.Mui-checked': {
                fontFamily: 'Roboto',
            },
            '&.Mui-disabled': {
                fontFamily: 'Roboto',
                color: 'gray',
            },
            '&.MuiFormControlLabel-label': {
                fontFamily: 'Roboto'
            }
        },
    },
});

// used material ui stepper to implement form steppers 
const steps = [
    {
        label: 'Company Information',
    },
    {
        label: 'Applicant Information',
    },
    {
        label: 'Upload Documents',
    },
    {
        label: 'Terms and conditions',
    },

];

function Home() {
    const [activeStep, setActiveStep] = useState(0);
    const [companyUen, setCompanyUen] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [reEmail, setReemail] = useState('');
    const [position, setPosition] = useState('');
    const [mobile, setMobile] = useState('');
    const [fullName, setFullName] = useState('');
    const [agree, setAgree] = useState(false);
    const [files, setFiles] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [isFormData, setIsFormData] = useState(true);
    const stepsForSecond = [companyName, companyUen]
    const stepsForThird = [companyName, companyUen, email, mobile, fullName, reEmail, position]
    const [isValidFirst, setIsValidFirst] = useState(false)
    const [isValidSecond, setIsValidSecond] = useState(false)
    const [isValidThird, setIsValidThird] = useState(false)
    const [isValidFinal, setIsValidFinal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    // handling step changes for stepper
    const handleChangeStep = (event) => {
        if (event) {
            setActiveStep(1)
        }
        else {
            setActiveStep(0)
        }
    };
    // handling step changes for stepper
    const handleChangeStepSecond = (event) => {

        if (event) {
            setActiveStep(2)
        }
        else {
            setActiveStep(1)
        }
    };
    // handling step changes for stepper
    const handleChangeStepThird = (event) => {
        if (event) {
            setActiveStep(3)
        }
        else {
            setActiveStep(2)
        }
    };
    // handling step changes for stepper
    const handleChangeStepFinal = (event) => {
        console.log(event)
        if (event) {
            setActiveStep(4)
        }
        else {
            setActiveStep(3)
        }
    };

    // Submit data and get the data back to show in table
    async function handleSubmit() {
        console.log(companyName, companyUen, email, mobile, reEmail, position, fullName)
        let dataObj = {
            companyUen: companyUen,
            companyName: companyName,
            userName: fullName,
            email: email,
            mobile: mobile?.toString().replace(/\s/g, ''),
            position: position
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataObj)
        }

        let response = await fetch('/api/postData', requestOptions);
        let res = await response.json();
        if (response.status === 200) {
            setIsLoading(true)
            setIsFormData(false)
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)

            setTableData(res)
            console.log(res)
        }
    };
    let i = 0;
    const rows = tableData.map(data => ({
        id: (i += 1),
        companyUen: data.companyUen,
        companyName: data.companyName,
        fullName: data.userName,
        position: data.position,
        email: data.email,
    }));

    // handle state changes for the fields
    const companyUenChange = (event) => {
        setCompanyUen(event.target.value)
    }
    // handle state changes for the fields
    const companyNameChange = (event) => {
        setCompanyName(event.target.value)

    }
    // handle state changes for the fields
    const RegisterMobile = (event) => {
        setMobile(event)
    }
    // handle state changes for the fields
    const EmailChange = (event) => {
        setEmail(event.target.value)
    }
    // handle state changes for the fields
    const reEmailChange = (event) => {
        setReemail(event.target.value)
    }
    // handle state changes for the fields
    const PositionChange = (event) => {
        setPosition(event.target.value)
    }
    // handle state changes for the fields
    const fullNameChange = (event) => {
        setFullName(event.target.value)
    }
    // handle state changes for the fields
    const checkBoxChanged = (event) => {
        console.log(event.target.checked)
        setAgree(event.target.checked)
    }
    // add custom rules for react-material ui- validation for checking cases
    ValidatorForm.addValidationRule('isUENMatch', (value) => {
        return /^[0-9]{8}[a-zA-Z]$/.test(value);
    });
    // add custom rules for react-material ui- validation for checking cases
    ValidatorForm.addValidationRule('isEmailMatch', (value) => {
        if (value !== email) {
            return false;
        }
        return true;
    });
    // add custom rules for react-material ui- validation for checking cases
    ValidatorForm.addValidationRule('isEmailRequired', (value) => {
        if (value.trim() === '') {
            return false;
        }
        return true;
    });
    // add custom rules for react-material ui- validation for checking cases
    ValidatorForm.addValidationRule('validateMobile', (value) => {
        const singaporeMobileRegex = /^(\+?65|0)\d{8}$/.test(value);
        if (singaporeMobileRegex) {
            return false;
        }
        return true;
    });
    // add custom rules for react-material ui- validation for checking cases
    ValidatorForm.addValidationRule('isCompanyName', (value) => {
        if (value?.trim() === '') {
            return false;
        }
        return true;
    });
    // add custom rules to disable and enable the form
    const handleSecondStepDisabledChange = (step) => {
        const areFieldsFilled = stepsForSecond.every(field => (field !== '' && field !== ' '));
        if (isValidFirst === true && areFieldsFilled) {
            return false
        }
        return true;
    };
    // add custom rules to disable and enable the form
    const handleThirdStepDisableChange = (step) => {
        const areFieldsFilled = stepsForThird.every(field => (field !== '' && field !== ' '));
        if (isValidFirst === true && isValidSecond === true && areFieldsFilled) {
            return false
        }
        return true;
    };

    // add custom rules to disable and enable the form
    const handleFourthStepChange = (step) => {
        const areFieldsFilled = stepsForThird.every(field => (field !== '' && field !== ' '));
        if (isValidFirst === true && isValidSecond === true && isValidThird === true && areFieldsFilled) {
            return false
        }
        return true;
    };

    // add custom rules to disable and enable the form
    const handleFinalStepChange = () => {
        const areFieldsFilled = stepsForThird.every(field => (field !== '' && field !== ' '));
        if (isValidFirst === true && isValidSecond === true && isValidThird === true & isValidFinal === true && areFieldsFilled) {
            return false
        }
        return true;
    }

    // add custom rules to validate the form and remove disabled
    const handleFormValidation = () => {
        const uenValid = /^[0-9]{8}[a-zA-Z]$/.test(companyUen);
        const nameIsValid = companyName.trim() !== '';
        if (uenValid && nameIsValid) {
            setIsValidFirst(true);
            handleChangeStep(true)
        }
        else {
            setIsValidFirst(false);
            handleChangeStep(false)
        }
    }
    // add custom rules to validate the form and remove disabled
    const handleFormValidationSecond = () => {
        const uenValid = /^[0-9]{8}[a-zA-Z]$/.test(companyUen);
        const nameIsValid = companyName.trim() !== '';
        const positionValid = position.trim() !== '';
        const fullNameIsValid = fullName.trim() !== '';
        const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
        const reEmailValid = (reEmail === email)
        const mobileValid = mobile.trim() !== '';
        if (uenValid && nameIsValid && fullNameIsValid && positionValid && positionValid && emailValid && reEmailValid && mobileValid) {
            setIsValidSecond(true);
            handleChangeStepSecond(true)
        }
        else {
            setIsValidSecond(false);
            handleChangeStepSecond(false)
        }
    }

    // add custom rules to validate the form and remove disabled
    const handleFormValidationThird = () => {
        const uenValid = /^[0-9]{8}[a-zA-Z]$/.test(companyUen);
        const nameIsValid = companyName.trim() !== '';
        const positionValid = position.trim() !== '';
        const fullNameIsValid = fullName.trim() !== '';
        const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
        const reEmailValid = (reEmail === email)
        const mobileValid = mobile.trim() !== '';
        const docsValid = (files?.length === 6);
        if (uenValid && nameIsValid && fullNameIsValid && positionValid && positionValid && emailValid && reEmailValid && mobileValid && docsValid) {
            setIsValidThird(true);
            handleChangeStepThird(true)
        }
        else {
            setIsValidThird(false);
            handleChangeStepThird(false)
        }
    }
    // add custom rules to validate the form and remove disabled
    const handleFormValidationFinal = () => {
        const uenValid = /^[0-9]{8}[a-zA-Z]$/.test(companyUen);
        const nameIsValid = companyName.trim() !== '';
        const positionValid = position.trim() !== '';
        const fullNameIsValid = fullName.trim() !== '';
        const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
        const reEmailValid = (reEmail === email)
        const mobileValid = mobile.trim() !== '';
        const docsValid = (files?.length === 6);
        const agreed = agree
        if (uenValid && nameIsValid && fullNameIsValid && positionValid && positionValid && emailValid && reEmailValid && mobileValid && docsValid && agreed) {
            setIsValidFinal(true);
            handleChangeStepFinal(true)
        }
        else {
            setIsValidFinal(false);
            handleChangeStepFinal(false)
        }
    }
    // setting files
    const handleRemoveFile = (file) => {
        setFiles(prevFiles => prevFiles.filter(files => files !== file));
    }

    // using react dropzone for file upload and adding customization
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'application/pdf': ['.pdf',]
        },
        multiple: true,
        onDrop: ((files) => setFiles(files)),
        maxFiles: 6,
        disabled: handleThirdStepDisableChange(),
        onError: (error) => console.error(error)
    });

    // using react dropzone and fileList 
    const fileList = files.map(file => (
        <Grid item key={file.path} xs={12} sm={6} style={{ color: handleThirdStepDisableChange() ? 'gray' : 'black', textDecoration: 'none' }}>
            <ButtonGroup variant="outlined" sx={{ borderRadius: '20px', border: '2px solid green', maxWidth: '300px', margin: 'auto', marginBottom: '10px' }}>
                <Button disabled>
                    <Typography variant="body2" noWrap>{file.name}</Typography>
                </Button>
                <Button sx={{ border: "none", color: "green" }} onClick={() => handleRemoveFile(file)}>
                    <ClearIcon style={{ cursor: 'pointer' }} />
                </Button>
            </ButtonGroup>
        </Grid>
    ));

    // using custom step function 
    const renderStep = (step) => {
        let content = null;
        // eslint-disable-next-line
        switch (step) {
            // company uen and name 
            case 0:
                content = (
                    <Box component="form" className='mt-1'>
                        <ThemeProvider theme={theme}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextValidator
                                        id='companyUEN'
                                        label="Company UEN"
                                        placeholder='Enter your Company UEN'
                                        variant="outlined"
                                        name="companyUen"
                                        value={companyUen}
                                        validators={["required", "isUENMatch"]}
                                        onChange={companyUenChange}
                                        errorMessages={["Company UEN is required", "Invalid Company UEN"]}
                                        onBlur={() => { handleFormValidation() }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextValidator
                                        id='companyName'
                                        label="Company Name"
                                        name="companyName"
                                        value={companyName}
                                        placeholder='Enter your Company Name'
                                        onChange={companyNameChange}
                                        validators={["required", "isCompanyName"]}
                                        errorMessages={["Company Name is required", "Company Name is required"]}
                                        onBlur={() => { handleFormValidation() }}
                                        fullWidth

                                    />
                                </Grid>
                            </Grid>
                        </ThemeProvider>

                    </Box>


                );
                break;
            // other details in second form 
            case 1:
                content = (
                    <Box component="form" className='mt-1'>
                        <ThemeProvider theme={theme}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextValidator
                                        id='companyName'
                                        label="Full Name"
                                        name="fullName"
                                        value={fullName}
                                        placeholder='Enter your Full Name'
                                        onChange={fullNameChange}
                                        validators={["required", "isCompanyName"]}
                                        errorMessages={["Field is required", "Full Name is required"]}
                                        fullWidth
                                        disabled={handleSecondStepDisabledChange(step)}
                                        onBlur={() => { handleFormValidationSecond() }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextValidator
                                        id='fullName'
                                        label="Position in Company"
                                        name="fullName"
                                        value={position}
                                        placeholder='Enter your Position in Company'
                                        onChange={PositionChange}
                                        validators={["required", "isCompanyName"]}
                                        errorMessages={["Field is required", "Position in Company is required"]}
                                        fullWidth
                                        disabled={handleSecondStepDisabledChange(step)}
                                        onBlur={() => { handleFormValidationSecond() }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextValidator
                                        id='email'
                                        label="Email"
                                        name="email"
                                        value={email}
                                        placeholder='Enter your Email'
                                        onChange={EmailChange}
                                        validators={["required", 'isEmail', "isEmailRequired"]}
                                        errorMessages={["Field is required", "Invalid email format", "Email is required"]}
                                        helperText="The report will be delivered on this email address"
                                        fullWidth
                                        disabled={handleSecondStepDisabledChange(step)}
                                        onBlur={() => { handleFormValidationSecond() }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextValidator
                                        id='reEmail'
                                        label="Re Enter Email"
                                        name="reEmail"
                                        value={reEmail}
                                        placeholder='Re-enter your Email'
                                        onChange={reEmailChange}
                                        validators={["isEmail", "isEmailMatch", "isEmailRequired"]}
                                        errorMessages={["Field is required", "Email dosen't match", "Email is required"]}
                                        fullWidth
                                        disabled={handleSecondStepDisabledChange(step)}
                                        onBlur={() => { handleFormValidationSecond() }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <MuiTelInput
                                        label="Mobile"
                                        defaultCountry="SG"
                                        onlyCountries={['SG']}
                                        onChange={RegisterMobile}
                                        name="mobile"
                                        value={mobile}
                                        required
                                        validators={['required', 'validateMobile']}
                                        errorMessages={['This field is required', 'Invalid Singapore mobile number']}
                                        fullWidth
                                        disabled={handleSecondStepDisabledChange(step)}
                                        onBlur={() => { handleFormValidationSecond() }}
                                    />
                                </Grid>
                            </Grid>
                        </ThemeProvider>
                    </Box>

                );
                break;

            // upload docs form
            case 2:
                content = (
                    <Box className='mt-1' >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} className='' onBlur={() => { handleFormValidationThird() }}>
                                <div {...getRootProps({ className: 'dropzone upload-docs h-50' })}>
                                    <input {...getInputProps()} />
                                    <Description size={24} style={{ color: handleThirdStepDisableChange() ? 'gray' : 'black', textDecoration: 'none' }} />
                                    <p style={{ color: handleThirdStepDisableChange() ? 'gray' : 'black', textDecoration: 'none' }}>Drag 'n' drop some files here, or click to select files</p>
                                </div>

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'justify' }}>
                                    <li style={{ color: handleThirdStepDisableChange() ? 'gray' : 'black', textDecoration: 'none' }}>
                                        <DoneIcon style={{ color: handleThirdStepDisableChange() ? 'gray' : 'green', textDecoration: 'none' }} /><span> PDFs (not scanned copies) of company's operating bank current account(s) statements for the past 6 months.</span>
                                    </li>
                                    <li style={{ color: handleThirdStepDisableChange() ? 'gray' : 'black', textDecoration: 'none' }}>
                                        <DoneIcon style={{ color: handleThirdStepDisableChange() ? 'gray' : 'green', textDecoration: 'none' }} /><span> Example: If today is 13 Mar 24, then please upload bank statements from Sep 23 to Feb 24 (both months inclusive)</span>
                                    </li>
                                    <li style={{ color: handleThirdStepDisableChange() ? 'gray' : 'black', textDecoration: 'none' }}>
                                        <DoneIcon style={{ color: handleThirdStepDisableChange() ? 'gray' : 'green', textDecoration: 'none' }} /><span> If your company is multi-banked, then please upload 6 months bank statements for each bank account</span>
                                    </li>
                                    <li style={{ color: handleThirdStepDisableChange() ? 'gray' : 'black', textDecoration: 'none' }}>
                                        <DoneIcon style={{ color: handleThirdStepDisableChange() ? 'gray' : 'green', textDecoration: 'none' }} /><span> If your file is password protected, we request you to remove the password and upload the file to avoid submission failure</span>
                                    </li>
                                    <li style={{ color: handleThirdStepDisableChange() ? 'gray' : 'black', textDecoration: 'none' }}>
                                        {/* eslint-disable-next-line */}
                                        <DoneIcon style={{ color: handleThirdStepDisableChange() ? 'gray' : 'green', textDecoration: 'none' }} /><span> In case if you are facing any issue while uploading bank statements, Please contact us on <a href={handleThirdStepDisableChange() ? "#" : 'mailto:support@credilinq.ai'} rel="noreferrer" style={{ color: handleThirdStepDisableChange() ? 'gray' : 'purple', textDecoration: 'none' }}>support@credilinq.ai</a></span>
                                    </li>
                                </ul>
                            </Grid>

                            <Grid container spacing={2}>
                                {fileList}
                            </Grid>
                        </Grid>
                    </Box>
                )
                break;
            // use tick and checkbox 
            case 3:
                content = (
                    <Box component="form" className='mt-1'>
                        <Grid container spacing={1}>
                            <Grid item xs={9} >
                                <FormControl component="fieldset" variant="standard" >
                                    <FormGroup>
                                        <FormControlLabel control={
                                            <Checkbox
                                                sx={{
                                                    root: {
                                                        fontFamily: 'Roboto !important'
                                                    },
                                                    '&.Mui-checked': {
                                                        fontFamily: 'Roboto !important'
                                                    },
                                                    '&.Mui-disabled': {
                                                        fontFamily: 'Roboto !important'
                                                    },
                                                    '&.MuiFormControlLabel-label': {
                                                        fontFamily: 'Roboto !important'
                                                    }
                                                }}
                                                checked={agree}
                                                color="success"
                                                disabled={handleFourthStepChange()}
                                                onChange={checkBoxChanged}
                                                onBlur={() => { handleFormValidationFinal() }}
                                            />
                                        }
                                            label={<p style={{ color: handleFourthStepChange() ? 'gray' : 'black', textDecoration: 'none', display: 'flex', alignItems: 'center', fontFamily: "Roboto" }}>By ticking, you are confirming that you have understood and are agreeing to the details mentioned:</p>}
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={10}>
                                <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'left' }}>
                                    <li style={{ color: handleFourthStepChange() ? 'gray' : 'black', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                                        <DoneIcon style={{ color: handleFourthStepChange() ? 'gray' : 'green', marginRight: '8px', textDecoration: 'none' }} />
                                        <span>I confirm that I am the authorized person to upload bank statements on behalf of my company.</span>
                                    </li>
                                    <li style={{ color: handleFourthStepChange() ? 'gray' : 'black', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                                        <DoneIcon style={{ color: handleFourthStepChange() ? 'gray' : 'green', marginRight: '8px', textDecoration: 'none' }} />
                                        <span>I assure you that uploaded bank statements and provided company information match and are of the same company, if there is a mismatch then my report will not be generated</span>
                                    </li>
                                    <li style={{ color: handleFourthStepChange() ? 'gray' : 'black', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                                        <DoneIcon style={{ color: handleFourthStepChange() ? 'gray' : 'green', marginRight: '8px', textDecoration: 'none' }} />
                                        <span>I understand that this is a general report based on the bank statements and Credilinq is not providing a solution or guiding me for my business growth.</span>
                                    </li>

                                    <li style={{ color: handleFourthStepChange() ? 'gray' : 'black', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                                        <DoneIcon style={{ color: handleFourthStepChange() ? 'gray' : 'green', marginRight: '8px', textDecoration: 'none' }} />
                                        {/* eslint-disable-next-line */}
                                        <span>I have read and understand the <a href={handleFourthStepChange() ? "#" : 'https://smehealthcheck.credilinq.ai/terms-and-conditions'} target='_blank' style={{ color: handleFourthStepChange() ? 'gray' : 'purple', textDecoration: 'none' }} rel="noreferrer">Terms & Conditions</a></span>
                                    </li>
                                </ul>
                            </Grid>
                        </Grid>
                    </Box >
                );
                break;
        }
        return content;
    };

    // normal function 
    return (
        <div>
            <Grid item xs={12}>
                {/* header function */}
                <div className='background-header'>
                    <Box className="header">
                        <img src={logo} className="img-fluid" width="150" alt="Logo " />
                        <p className='header-font'>
                            SME HealthCheck - Get Started
                        </p>
                    </Box>

                </div>
                <div>
                    {isLoading ? (<div className='stepper-body'>Submitting Form</div>) : (
                        isFormData ? (
                            <Box className='stepper-body' >
                                <ThemeProvider theme={theme}>
                                    <Grid item xs={12}>

                                        <Stepper activeStep={activeStep} orientation="vertical">
                                            {steps.map((step, index) => (
                                                <Step key={step.label} active={true}>
                                                    <StepLabel  >
                                                        <div className='stepper-label'>
                                                            {step.label}
                                                        </div>

                                                    </StepLabel>
                                                    <StepContent>
                                                        <ValidatorForm instantValidate >
                                                            {renderStep(index)}

                                                        </ValidatorForm>

                                                    </StepContent>
                                                </Step>
                                            ))}
                                            <Button className='button' disabled={handleFinalStepChange()} onClick={handleSubmit}>Submit</Button>
                                        </Stepper>
                                    </Grid>

                                </ThemeProvider>

                            </Box>) : (
                                // added mui-data grid for table
                            <div style={{ height: 500}} className='stepper-body'>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    sx={{
                                        '.MuiDataGrid-columnSeparator': {
                                          display: 'none',
                                        },
                                        '&.MuiDataGrid-columnHeadersInner': {
                                            fontWeight:"Bold !important"
                                        },
                                      }}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 10 },
                                        },
                                    }}
                                    pageSizeOptions={[10, 25, 50]}
                                />
                            </div>
                        ))
                    }

                </div>
            </Grid >
        </div >
    );
}
export default Home