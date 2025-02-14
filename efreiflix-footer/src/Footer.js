import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import "./i18n";

const FooterContainer = styled.footer`
  background: #000;
  padding: 4rem 4%;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 5rem;
  font-family: "Montserrat", sans-serif;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const Section = styled.div`
  h4 {
    color: #fff;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    position: relative;
    font-family: "Montserrat", sans-serif;

    &:after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 40px;
      height: 2px;
      background: #e50914;
    }
  }
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 0.8rem;
  }
`;

const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s ease;

  &:hover {
    color: #e50914;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #e50914;
    transform: translateY(-2px);
  }
`;

const LanguageButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.7);
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
`;

const Footer = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
    // Store the language preference in localStorage
    localStorage.setItem("preferred-language", newLang);
    // Dispatch a custom event to notify other micro-frontends
    window.dispatchEvent(
      new CustomEvent("language-changed", { detail: newLang }),
    );
  };

  return (
    <FooterContainer>
      <ContentWrapper>
        <Section>
          <h4>{t("navigation.title")}</h4>
          <LinkList>
            <li>
              <FooterLink href="/accueil">{t("navigation.home")}</FooterLink>
            </li>
            <li>
              <FooterLink href="/series">{t("navigation.series")}</FooterLink>
            </li>
            <li>
              <FooterLink href="/films">{t("navigation.movies")}</FooterLink>
            </li>
            <li>
              <FooterLink href="/nouveautes">
                {t("navigation.newReleases")}
              </FooterLink>
            </li>
          </LinkList>
        </Section>

        <Section>
          <h4>{t("legal.title")}</h4>
          <LinkList>
            <li>
              <FooterLink href="/confidentialite">
                {t("legal.privacy")}
              </FooterLink>
            </li>
            <li>
              <FooterLink href="/conditions">{t("legal.terms")}</FooterLink>
            </li>
            <li>
              <FooterLink href="/cookies">{t("legal.cookies")}</FooterLink>
            </li>
          </LinkList>
        </Section>

        <Section>
          <h4>{t("social.title")}</h4>
          <SocialLinks>
            <SocialIcon href="#" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </SocialIcon>
            <SocialIcon href="#" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </SocialIcon>
            <SocialIcon href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </SocialIcon>
          </SocialLinks>
        </Section>
      </ContentWrapper>

      <div
        style={{
          textAlign: "center",
          marginTop: "3rem",
          color: "rgba(255,255,255,0.4)",
          fontSize: "0.9rem",
        }}
      >
        <LanguageButton onClick={toggleLanguage}>
          {i18n.language === "en" ? "Français" : "English"}
        </LanguageButton>
        <div style={{ marginTop: "1rem" }}>
          {t("copyright", { year: new Date().getFullYear() })}
        </div>
      </div>
    </FooterContainer>
  );
};

export default Footer;
