import MainCoverSection from "../components/mainCover";
import { useState, useEffect } from "react";
import MapCard from "../components/contactUs/mapCard";
import {
  Grid,
  Typography,
  Container,
  Box,
  TextField,
  Button,
  TextareaAutosize,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import styles from "../styles/contact/style.module.css";
import Details from "../components/contactUs/detail.js";
import { GET_CONTACT } from "../services/endpoints";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { PostSendEmail } from "../services/endpoints";
import useFetch from "../components/useFetch/useFetch";
import CustomLoader from "../components/customLoader";

export default function ContactUs({ data, theme, headerType }) {
  let { t } = useTranslation("common");
  const [getFetch, postFetch] = useFetch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState({
    title: data?.data?.pageDetail?.title,
    description: data?.data?.pageDetail?.description,
    image: data?.data?.pageDetail?.image,
    breadcrumbs: [
      {
        title: "home",
        link: "/",
      },
      {
        title: "contact",
        link: "",
      },
    ],
    headerType: headerType,
  });

  const SendEmail = async () => {
    let res = await postFetch(PostSendEmail, process.env.NEXT_PUBLIC_MERCHANT, {
      Name: name,
      Mobile: mobile,
      Email: email,
      Body: body,
    });
    let data = await res?.json();
    if (data?.status == 200) toast.success("Subscribe successfully");
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
  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "100vh",
          background: "#fcfcfc",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: "1000",
        }}
        className={loading == false && "none"}
      >
        <CustomLoader />
      </div>
      <div className={loading == true && "hidden"}>
        <MainCoverSection
          breadcrumbs={pageInfo.breadcrumbs}
          title={pageInfo.title}
          description={pageInfo.description}
          image={pageInfo.image}
          headerType={headerType}
        />
        <Box sx={{ backgroundColor: "background.main" }}>
          <Container
            className={styles.contactContainer}
            maxWidth="lg"
            sx={{ paddingBottom: "100px" }}
          >
            <Head>
              <title>{t("contacts")}</title>
            </Head>
            <Grid container spacing={6} className={styles.gridContainer}>
              <Grid item xs={12} md={7}>
                <Box
                  className={styles.detailCard}
                  sx={{
                    backgroundColor: "card.main",
                    color: "onCard.main",
                    boxShadow: `0px 0px ${theme?.elevation}px`,
                    borderRadius: theme?.radius,
                  }}
                >
                  <MapCard
                    lat={data?.data?.pageItems?.map?.lat}
                    lng={data?.data?.pageItems?.map?.lng}
                  />
                  <Details data={data?.data?.pageItems?.channels} />
                  <Box>
                    {/* <Typography
                  variant="body2"
                  color="onCard.main"
                  sx={{ my: "8px" }}
                >
                  {t("followus")}
                </Typography> */}
                    <div>
                      <WhatsAppIcon
                        sx={{
                          mx: "4px",
                          color: "primary.main",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          window.open(
                            `https://web.whatsapp.com/${data?.data?.pageItems?.whatsApp}`,
                            "_blank"
                          )
                        }
                      />
                      <TelegramIcon
                        sx={{
                          mx: "4px",
                          color: "primary.main",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          window.open(data?.data?.pageItems?.telegram, "_blank")
                        }
                      />
                      {/* <TwitterIcon
                    sx={{ mx: "4px", color: "primary.main", cursor: "pointer" }}
                    onClick={() =>
                      window.open(data?., "_blank")
                    }
                  /> */}
                      <FacebookIcon
                        sx={{
                          mx: "4px",
                          color: "primary.main",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          window.open(data?.data?.pageItems?.facebook, "_blank")
                        }
                      />
                    </div>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={5}>
                <Typography
                  variant="h6"
                  color="onBackground.dark"
                  sx={{ mb: "20px" }}
                >
                  {t("leaveMessage")}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "35px",
                    justifyContent: "space-evenly",
                  }}
                >
                  <TextField
                    id="contactName"
                    placeholder={t("namePlace")}
                    variant="outlined"
                    size="small"
                    className={styles.input}
                    value={name}
                    onChange={(e) => setName(e?.currentTarget?.value)}
                  />
                  <TextField
                    id="contactemail"
                    placeholder={t("emailPlace")}
                    variant="outlined"
                    size="small"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                  />

                  <TextField
                    id="contactphone"
                    placeholder={t("phonePlace")}
                    variant="outlined"
                    size="small"
                    className={styles.input}
                    value={mobile}
                    onChange={(e) => setMobile(e.currentTarget.value)}
                  />
                  <Box sx={{ borderColor: "primary.main" }}>
                    <TextareaAutosize
                      id="contactName"
                      placeholder={t("messagePlace")}
                      size="400px"
                      minRows={5}
                      className={`${styles.inputArea} borderCol`}
                      style={{ fontSize: "18px" }}
                      value={body}
                      onChange={(e) => setBody(e.currentTarget.value)}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    sx={{
                      width: "fit-content",
                      // borderRadius: "36px",
                      borderRadius: theme?.radius,
                      boxShadow: `0px 0px ${theme?.elevation}px`,
                      color: "onPrimary.main",
                      fontSize: "18px",
                      p: "3px 28px",
                    }}
                    onClick={() => SendEmail()}
                  >
                    {t("send")}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </div>
    </div>
  );
}
export async function getStaticProps({ locale }) {
  const [getFetch] = useFetch();
  const res = await getFetch(
    GET_CONTACT,
    process.env.NEXT_PUBLIC_MERCHANT,
    locale
  );
  const data = await res?.json();
  return {
    props: {
      data: data || "",
    },
  };
}
