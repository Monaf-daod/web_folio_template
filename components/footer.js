import { Grid } from "@mui/material";
import { Typography, Container, Box, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import { FOOTER, PostFooterSubscribe } from "../services/endpoints";
import { useEffect, useState } from "react";
import useFetch from "./useFetch/useFetch";
import ContactIcons from "./homePage/contactIcons";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { toast } from "react-toastify";
import style from "../styles/footer/style.module.css";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import TelegramIcon from "@mui/icons-material/Telegram";

function Footer(props) {
  const { theme } = props;
  let { t, lang } = useTranslation("common");
  const [footerApi, setFooterApi] = useState();
  const [showIcons, setShowIcons] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [getFetch, postFetch] = useFetch();
  const handleScroll = () => {
    if (window.scrollY <= 100) setShowIcons(false);
    if (window.scrollY > 100) setShowIcons(true);
    if (window.scrollY > 2400) setShowIcons(false);
  };
  useEffect(() => {
    if (typeof window === "object")
      document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(async () => {
    let res = await getFetch(FOOTER, process.env.NEXT_PUBLIC_MERCHANT);
    let data = await res?.json();
    setFooterApi(data);
  }, []);

  const SendEmail = async () => {
    let res = await postFetch(
      PostFooterSubscribe,
      process.env.NEXT_PUBLIC_MERCHANT,
      { email: email }
    );
    let data = await res?.json();
    setEmail("");
    if (data?.status == 200) toast.success("Subscribe successfully");
  };

  const alllists = [
    {
      logo: theme?.logo,
      itemOne: footerApi?.data?.footer?.content?.personalInfo?.description,
    },
    footerApi?.data?.footer?.content?.subscribe?.active == true && {
      title: "Stayupdated",
      subscripe: "enabled",
    },
    footerApi?.data?.footer?.content?.socialMedia?.active == true && {
      title:
        footerApi?.data?.footer?.content?.socialMedia?.active == true
          ? "Stayconected"
          : "",
      // SocialFace: "Facebook",
      // SocilaInst: "Instagram",
      // SocialTwit: "Twitter",
      location: footerApi?.data?.footer?.content?.personalInfo?.location,
      phone: footerApi?.data?.footer?.content?.personalInfo?.phone,
      Email: footerApi?.data?.contacts?.find(
        (contact) => contact.channel == "Email"
      )?.value,
      social: "social",
    },
  ];
  const lists = alllists.filter((item) => item != false);

  const locationOnMapCordinates = {
    lat:
      footerApi?.data?.contacts?.find((item) => item.channel == "Lat")?.value ??
      "24.2333076",
    lng:
      footerApi?.data?.contacts?.find((item) => item.channel == "Lng")?.value ??
      "55.7325268",
  };

  function checkLoadImages() {
    if (typeof window == "object") {
      Promise.all(
        Array.from(document.images).map((img) => {
          if (img.complete) return Promise.resolve(img.naturalHeight !== 0);
          return new Promise((resolve) => {
            img.addEventListener("load", () => resolve(true));
            img.addEventListener("error", () => resolve(false));
          });
        })
      ).then((results) => {
        if (results.every((res) => res)) setLoading(false);
        else setLoading(false);
      });
    }
  }
  useEffect(() => {
    checkLoadImages();
  }, []);
  const newDescription =
    footerApi?.data?.footer?.content?.personalInfo?.description?.split("\n");
  return (
    <div className={loading == true && "hidden"}>
      {showIcons == true && <ContactIcons links={footerApi?.data?.contacts} />}
      <Box sx={{ backgroundColor: "background.main", pt: "40px" }}>
        <Container maxWidth="lg" sx={{ marginBottom: "50px" }}>
          <div>
            <Grid container sx={{ background: "primary.main" }}>
              {lists.map((item, index) => {
                return (
                  <Grid
                    item
                    xs={12}
                    md={lists.length == 3 ? 4 : lists.length == 2 ? 6 : 12}
                    key={index}
                    sx={{
                      px: "15px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {Object.entries(item).map(([key, value]) => (
                      <div key={key}>
                        {key == "logo" && value ? (
                          <Image
                            src={value}
                            width={100}
                            height={48}
                            style={{ marginBottom: "38px" }}
                          />
                        ) : key == "title" ? (
                          <Typography
                            variant="h6"
                            color="onBackground.main"
                            component="h6"
                            sx={{
                              mb: { xs: "15px", md: "38px" },
                              mt: { xs: "25px", md: "10px" },
                              fontWeight: "700",
                            }}
                          >
                            {t(value)}
                          </Typography>
                        ) : key == "location" ? (
                          <div
                            className={style.flexStart}
                            style={{
                              flexDirection: "row",
                              justifyContent: "start",
                            }}
                            onClick={() =>
                              window.open(
                                `https://www.google.com/maps/@${locationOnMapCordinates.lat},${locationOnMapCordinates.lng},19z`,
                                "_blank"
                              )
                            }
                          >
                            <LocationOnIcon
                              style={{
                                fill: theme?.primaryColor,
                                fontSize: "20px",
                              }}
                            />
                            <Typography
                              variant="body2"
                              color="onBackground.main"
                              sx={{
                                lineHeight: "1.1",
                                textDecoration: "underline",
                                cursor: "pointer",
                                padding: "0px 3px",
                              }}
                            >
                              {value}
                            </Typography>
                          </div>
                        ) : key == "phone" ? (
                          <div
                            className={style.flexStart}
                            style={{
                              flexDirection: "row",
                              justifyContent: "start",
                            }}
                          >
                            <PhoneIcon
                              style={{
                                fill: theme?.primaryColor,
                                fontSize: "20px",
                              }}
                            />
                            <Typography
                              variant="body1"
                              color="onBackground.main"
                              sx={{
                                lineHeight: "1.1",
                                padding: "0px 3px",
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                window.open(`tel:${value}`, "_self")
                              }
                            >
                              {value}
                            </Typography>
                          </div>
                        ) : key == "Email" ? (
                          <div
                            className={style.flexStart}
                            style={{
                              flexDirection: "row",
                              justifyContent: "start",
                            }}
                          >
                            <EmailIcon
                              style={{
                                fill: theme?.primaryColor,
                                fontSize: "20px",
                              }}
                            />
                            <Typography
                              variant="body1"
                              color="onBackground.main"
                              sx={{
                                lineHeight: "1.1",
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                window.open(`mailto:${value}`, "_self")
                              }
                            >
                              {value}
                            </Typography>
                          </div>
                        ) : key == "subscripe" ? (
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                            }}
                          >
                            {" "}
                            <input
                              placeholder={t("Enter your email")}
                              className={style.inputFooter}
                              value={email}
                              onChange={(e) => setEmail(e.currentTarget.value)}
                            />
                            {/* <TelegramIcon
                            className={style.buttonIcon}
                            style={{ background: theme?.primaryColor }}
                            onClick={() => SendEmail()}
                          /> */}
                            <Button
                              className={style.footerSubmit}
                              onClick={() => SendEmail()}
                              sx={{
                                color: "onPrimary.main",
                                backgroundColor: "primary.main",
                                border: "1px solid",
                                boxShadow: `0px 0px ${theme?.elevation}px`,
                                borderRadius: theme?.radius,
                                "&:hover": {
                                  color: "primary.main",
                                  backgroundColor: "transparent",
                                  borderColor: "primary.main",
                                },
                              }}
                            >
                              {t("subscribe")}
                            </Button>
                          </Box>
                        ) : key == "social" ? (
                          <div
                            className="flex-start"
                            style={{
                              flexDirection: "row",
                              marginBottom: "15px",
                              marginTop: "10px",
                            }}
                          >
                            {footerApi?.data?.contacts.map((item) => {
                              return item.channel == "Facebook" ? (
                                <FacebookIcon
                                  style={{
                                    fill: theme?.primaryColor,
                                    cursor: "pointer",
                                    fontSize: "20px",
                                  }}
                                  onClick={() =>
                                    window.open(item?.value, "_blank")
                                  }
                                />
                              ) : item.channel == "Instagram" ? (
                                <InstagramIcon
                                  style={{
                                    fill: theme?.primaryColor,
                                    cursor: "pointer",
                                    fontSize: "20px",
                                  }}
                                  onClick={() =>
                                    window.open(item.value, "_blank")
                                  }
                                />
                              ) : item?.channel == "Twitter" ? (
                                <TwitterIcon
                                  style={{
                                    fill: theme?.primaryColor,
                                    cursor: "pointer",
                                    fontSize: "20px",
                                  }}
                                  onClick={() =>
                                    window.open(item.value, "_blank")
                                  }
                                />
                              ) : item.channel == "WhatsApp" ? (
                                <WhatsAppIcon
                                  style={{
                                    fill: theme?.primaryColor,
                                    cursor: "pointer",
                                    fontSize: "20px",
                                  }}
                                  onClick={() =>
                                    window.open(`${item.value}`, "_blank")
                                  }
                                />
                              ) : (
                                ""
                              );
                            })}
                          </div>
                        ) : (
                          newDescription?.map((str) => {
                            return (
                              <Typography
                                variant="body2"
                                color="onCard.dark"
                                component="h6"
                                sx={{
                                  lineHeight: "1.3",
                                  whiteSpace: "wrap",
                                }}
                              >
                                {str}
                              </Typography>
                            );
                          })
                        )}
                      </div>
                    ))}
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </Container>

        <div className={style.lastLine}>
          <Typography
            variant="body1"
            component="p"
            color="#232323cc"
            align="center"
            sx={{ textAlign: "center", fontSize: { xs: "14px", md: "17px" } }}
          >
            All rights reserved to{" "}
            <Typography
              component="span"
              sx={{ fontWeight: "bold", fontSize: { xs: "14px", md: "17px" } }}
            >
              {footerApi?.data?.footer?.merchantName}
            </Typography>{" "}
            Powered by{" "}
            <Typography
              component="span"
              style={{
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: { xs: "14px", md: "17px" },
              }}
              onClick={() => window.open("https://meta-itech.com/", "_blank")}
            >
              Meta
            </Typography>
          </Typography>
        </div>
      </Box>
    </div>
  );
}
export default Footer;
