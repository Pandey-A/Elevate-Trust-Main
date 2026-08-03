import partnerAws from "../assets/homepage-icons/partners/aws.png";
import partnerAzure from "../assets/homepage-icons/partners/azure.png";
import partnerGoogleCloud from "../assets/homepage-icons/partners/google-cloud.png";
import partnerMeta from "../assets/homepage-icons/partners/meta.png";
import partnerMicrosoft from "../assets/homepage-icons/partners/microsoft.png";
import partnerNvidia from "../assets/homepage-icons/partners/nvidia.png";

export const activePartners = [
  {
    name: "AWS",
    logo: partnerAws,
    href: "https://aws.amazon.com/free/?trk=78c55dff-53b9-4938-8ed3-d071891360dd&sc_channel=ps&trk=78c55dff-53b9-4938-8ed3-d071891360dd&sc_channel=ps&ef_id=Cj0KCQjw-MDTBhCgARIsAKAkdlQfLYKvVe23F9Gt4MzRGy6HtHo__ehIHt6ig0uj2X9PcKrP0zuPXXYaAqKVEALw_wcB:G:s&s_kwcid=AL!4422!3!808712755158!e!!g!!aws!23846236475!198027716802&gad_campaignid=23846236475&gbraid=0AAAAADjHtp9Mys7SJOf-X6dr-tdt-LMMF&gclid=Cj0KCQjw-MDTBhCgARIsAKAkdlQfLYKvVe23F9Gt4MzRGy6HtHo__ehIHt6ig0uj2X9PcKrP0zuPXXYaAqKVEALw_wcB",
  },
  {
    name: "Microsoft Azure",
    logo: partnerAzure,
    href: "https://azure.microsoft.com/en-in",
  },
  {
    name: "Google Cloud",
    logo: partnerGoogleCloud,
    tall: true,
    href: "https://cloud.google.com/gcp?utm_source=google&utm_medium=cpc&utm_campaign=Cloud-SS-DR-GCP-1713664-GCP-DR-APAC-IN-en-Google-BKWS-MIX-GenericCloud&utm_content=c-Hybrid+%7C+BKWS+-+EXA+%7C+Txt+-+Generic+Cloud-Cloud+Generic-Core+GCP-IN_en-6458750523&utm_term=google%20cloud&gclsrc=aw.ds&gad_source=1&gad_campaignid=19498427244&gclid=Cj0KCQjw-MDTBhCgARIsAKAkdlQauNOmoeJ71gT_AwJ7Z1AMlcdKn4XXJ6oJqVCBOBTTHzH83Xk8GBIaApTqEALw_wcB",
  },
  {
    name: "Meta",
    logo: partnerMeta,
    href: "https://www.meta.com/en-gb/about/?srsltid=AfmBOoqVgvuPOK6N6w-18SbI-1Tj7_IWISMSucx_KFBSvajwlwzs_EnX",
  },
  {
    name: "Microsoft",
    logo: partnerMicrosoft,
    href: "https://www.microsoft.com/en-in",
  },
  {
    name: "NVIDIA",
    logo: partnerNvidia,
    tall: true,
    href: "https://www.nvidia.com/en-in/",
  },
] as const;

