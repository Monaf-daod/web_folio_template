import { Button, Grid, Typography } from "@mui/material";
import style from "../../styles/homePage/style.module.css";
import useTranslation from "next-translate/useTranslation";
function AboutSection({ data }) {
  let { t, lang } = useTranslation("common");
  return (
    <div data-aos="fade-right" data-aos-once>
      <Typography
        variant="h6"
        component="h6"
        sx={{
          borderBottom: "4px solid",
          borderColor: "primary.main",
          marginBottom: "18px",
        }}
        style={{
          fontSize: "42px",
          width: "fit-content",
          lineHeight: "1",
        }}
      >
        {t("AboutCompany")}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <div style={{ width: "100%", height: "100%" }}>
            <img src={data?.items?.image} className={style.aboutSectionImg} />
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <div className={style.aboutSectionContent}>
            <div>
              <h6 className={style.aboutSectionTitle}>{data?.items?.title}</h6>
              <p className={style.aboutSectionText}>{data?.items?.subTitle}</p>
            </div>
            {data?.items?.button != "" && (
              <Button
                className={style.aboutSectionButton}
                sx={{
                  color: "primary.main",
                  borderColor: "primary.main",
                  borderRadius: "15px 0px",
                  "&:hover": {
                    color: "white",
                    backgroundColor: "primary.main",
                  },
                }}
                onClick={() => window.open(data?.items?.buttonUrl, "_blank")}
              >
                {data?.items.button}
              </Button>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
export default AboutSection;
