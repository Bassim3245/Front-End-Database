import { styled } from "@mui/material";

export const currencies = [
    {
      value: "تنفيذ",
      label: "تنفيذ",
    },
    {
      value: "تنصيب",
      label: "تنصيب",
    },
    {
      value: "صيانة",
      label: "صيانة",
    },
    {
      value: "برمجة",
      label: "برمجة",
    },
  ];
  export const  optionMethod = [
    {
        value:"مناقصة ",
        label:"مناقصة",
    },
    {
        value:"طلب كتاب رسمي ",
        label:"طلب كتب رسمي ",
    },
    {
        value:"دعوة مباشرة  ",
        label:"الجهة المستفيدة ",
    },
    
]
export const  stage = [
    {
        value:"0% ",
        label:"0%",
    },
    {
        value:"10%",
        label:"10%",
    },
    {
        value:"20%",
        label:"20%",
    },

    {
        value:"30%",
        label:"30%",
    },
    {
        value:"40%",
        label:"40%",
    },
    {
        value:"50%",
        label:"50%",
    },
    {
        value:"60%",
        label:"60%",
    },
    {
        value:"70%",
        label:"70%",
    },
    {
        value:"80%",
        label:"80%",
    },
    {
        value:"90%",
        label:"90%",
    },
    {
        value:"100%",
        label:"100%",
    },
    
]
export const  LevelOfAchevment=[...stage];
export const  PerformenceLevel=[...stage];
export const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });