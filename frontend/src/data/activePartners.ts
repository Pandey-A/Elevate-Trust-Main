import partnerAws from "../assets/homepage-icons/partners/aws.png";
import partnerAzure from "../assets/homepage-icons/partners/azure.png";
import partnerGoogleCloud from "../assets/homepage-icons/partners/google-cloud.png";
import partnerMeta from "../assets/homepage-icons/partners/meta.png";
import partnerMicrosoft from "../assets/homepage-icons/partners/microsoft.png";
import partnerNvidia from "../assets/homepage-icons/partners/nvidia.png";

export const activePartners = [
  { name: "AWS", logo: partnerAws },
  { name: "Microsoft Azure", logo: partnerAzure },
  { name: "Google Cloud", logo: partnerGoogleCloud, tall: true },
  { name: "Meta", logo: partnerMeta },
  { name: "Microsoft", logo: partnerMicrosoft },
  { name: "NVIDIA", logo: partnerNvidia, tall: true },
] as const;

