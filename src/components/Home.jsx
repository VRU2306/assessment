import { useEffect, useState, } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import "./Home.css";
import logo from "../assets/logo/Credilinq.png"
import TextField from '@mui/material/TextField';
import DoneIcon from '@mui/icons-material/Done';
import { MuiTelInput } from "mui-tel-input";
import {
    ValidatorForm,
    TextValidator
} from "react-material-ui-form-validator";
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
    const [document, setDocument] = useState('');
    const [agree, setAgree] = useState(false);
    const [stepCompletion, setStepCompletion] = useState(steps.map(() => false));

    const stepsForSecond=[companyName,companyUen]
    const stepsForThird=[companyName,companyUen,email,mobile,fullName,reEmail,position]
    const [isValidFirst,setIsValidFirst]=useState(false)
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };


    const handleChangeStep = (event) => {
        console.log(isValidFirst,55)
        if(event){
            setActiveStep(1)
        }
        else{
            setActiveStep(0)
        }
    };
    const handleSubmit = () => {
        let data = {}

    };

    const companyUenChange = (event) => {
        setCompanyUen(event.target.value)
    }
    const companyNameChange = (event) => {
        setCompanyName(event.target.value)
     
    }
    const RegisterMobile = (event) => {
        setMobile(event)
    }
    const EmailChange = (event) => {
        setEmail(event.target.value)
    }
    const reEmailChange = (event) => {
        setReemail(event.target.value)
    }
    const PositionChange=(event)=>{
        setPosition(event.target.value)
    }

    const fullNameChange=(event)=>{
        setFullName(event.target.value)
    }

    ValidatorForm.addValidationRule('isUENMatch', (value) => {
        return /^[0-9]{8}[a-zA-Z]$/.test(value);
    });
    ValidatorForm.addValidationRule('isEmailMatch', (value) => {
        if (value !== email) {
            return false;
        }
        return true;
    });


    ValidatorForm.addValidationRule('validateMobile', (value) => {
        const singaporeMobileRegex = /^(\+?65|0)\d{8}$/;
        if (value !== singaporeMobileRegex.test(value)) {
            return false;
        }
        return true;
    });
    ValidatorForm.addValidationRule('isCompanyName', (value) => {
        if (value?.trim() == '') {
            return false;
        }
        return true;
    });

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length > 6) {
            alert("You can select up to 6 files.");
            // Clear the file input
            event.target.value = null;
        }
    };

    const handleSecondStepChange = (step) => {
        const areFieldsFilled = stepsForSecond.every(field => (field !== ''&& field !== ' '));
        if(isValidFirst===true && areFieldsFilled ){
            return false
        }
        return true;
    };
    
    const handleFormValidation=()=>{
        
        const uenValid = /^[0-9]{8}[a-zA-Z]$/.test(companyUen);
        const nameIsValid = companyName.trim()!='';
        console.log(uenValid,nameIsValid,139)
        setIsValidFirst(uenValid && nameIsValid);

        if(uenValid && nameIsValid){
            handleChangeStep(true)
        }
        else{
            handleChangeStep(false)
        }
    }

    const renderStep = (step) => {
        let content = null;
        switch (step) {
            case 0:
                content = (
                    <Box component="form" className='text-width'>
                        <TextValidator
                            id='companyUEN'
                            label="Company UEN"
                            placeholder='Enter your Company UEN'
                            variant="outlined"
                            name="companyUen"
                            className='text-width'
                            value={companyUen}
                            validators={["required", "isUENMatch"]}
                            onChange={companyUenChange}
                            errorMessages={["Company UEN is required", "Invalid Company UEN"]}
                            onKeyUp={(e) => {
                                console.log(e,167)
                               handleChangeStep(companyName)
                            }}
                        />

                        <TextValidator
                            id='companyName'
                            label="Company Name"
                            name="companyName"
                            value={companyName}
                            placeholder='Enter your Company Name'
                            className='text-width'
                            onChange={companyNameChange}
                            validators={["required","isCompanyName"]}
                            onClick={companyNameChange}
                            errorMessages={["Company Name is required","Company Name is required"]}
                        />
                    </Box>

                );
                break;
            case 1:
                content = (
                    <Box component="form" className='parent-width'>
                        <TextValidator
                            id='companyName'
                            label="Full Name"
                            name="fullName"
                            value={fullName}
                            placeholder='Enter your Full Name'
                            className='text-width'
                            onChange={fullNameChange}
                            validators={["required"]}
                            errorMessages={["Company Name is required"]}
                            disabled={handleSecondStepChange(step)}
                        />
                        <TextValidator
                            id='fullName'
                            label="Position in Company"
                            name="fullName"
                            value={position}
                            placeholder='Enter your Position in Company'
                            className='text-width'
                            onChange={PositionChange}
                            validators={["required"]}
                            errorMessages={["Company Name is required"]}
                        />
                        <TextValidator
                            id='email'
                            label="Email"
                            name="fullName"
                            value={email}
                            placeholder='Enter your Email'
                            className='text-width'
                            onChange={EmailChange}
                            validators={["required", 'isEmail']}
                            helperText="The report will be delivered on this email address"
                            errorMessages={["Required", "Email is required"]}
                        />
                        <TextValidator
                            id='companyName'
                            label="Re Enter Email"
                            name="fullName"
                            value={reEmail}
                            placeholder='Enter your Email'
                            className='text-width'
                            onChange={reEmailChange}
                            validators={["isEmail", "isEmailMatch"]}
                            errorMessages={["Email is required", "Email does not match"]}
                        />
                        <MuiTelInput
                            label="Mobile"
                            defaultCountry="SG"
                            onlyCountries={['SG']}
                            onChange={RegisterMobile}
                            name="mobile"
                            className='text-width'
                            value={mobile}
                            required
                            validators={['required', 'validateMobile']}
                            errorMessages={['This field is required', 'Invalid Singapore mobile number']}
                        />
                    </Box>

                );
                break;
            case 2:
                content = (
                    <Box className="row">
                        <div className='col-6 h-50 upload-docs'>
                        <label for="file">Upload Docs</label>
                        <input type='file' accept='application/pdf' multiple={true} onChange={handleFileChange}  />
                        </div>
                        <ul className='col-6'>
                            <li>
<DoneIcon/> PDFs (not scanned copies) of company's operating bank current account(s) statements for the past 6 months.
                            </li>
                            <li> <DoneIcon/> Example: If today is 13 Mar 24, then please upload bank statements from Sep 23 to Feb 24 (both months inclusive)</li>
                            <li><DoneIcon/>  If your company is multi-banked, then please upload 6 months bank statements for each bank account</li>
                            <li>
                            <DoneIcon/> If your file is password protected, we request you to remove the password and upload the file to avoid submission failure

                            </li>
                            <li>
                            <DoneIcon/>  In case if you are facing any issue while uploading bank statements, Please contact us on support@credilinq.ai
                            </li>
                        </ul>
                    </Box>



                )
                break;
            case 3:
                content = (
                    <TextValidator
                        key={3}
                        name="email3"
                        label="email 3"
                        validators={["required", "isEmail"]}
                        errorMessages={["required field", "invalid email"]}

                    />
                );
                break;
        }
        return content;
    };
    return (
        <div>
            <div className='background-header'>
                <Box className="header">
                    <img src={logo} className="img-fluid" width="150" alt="Logo " />
                    <p className='header-font'>
                        SME HealthCheck - Get Started
                    </p>
                </Box>

            </div>
            <div>
                <Box className='stepper-body'>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((step, index) => (
                            <Step key={step.label} active={true}>
                                <StepLabel  >
                                    <div className='stepper-label'>
                                        {step.label}
                                    </div>

                                </StepLabel>
                                <StepContent>
                                    <ValidatorForm onSubmit={handleSubmit} instantValidate >
                                        {renderStep(index)}
                                    </ValidatorForm>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            </div>

        </div>
    );
}
export default Home