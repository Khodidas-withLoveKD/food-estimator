import { themeColors } from "../shared/theme";

export const containerCss = {
  boxShadow: themeColors.boxShadow,
  border: themeColors.borderCss,
  borderRadius: themeColors.borderRadius,
  margin: '20px',
  height: 'fit-content'
}

export const selectedItemCss = {
  backgroundColor: themeColors.selectedBgColor,
  fontWeight: 500,
}

export const hoverItemCss = {
  transform: 'scale(1.05, 1.05)',
  backgroundColor: themeColors.selectedBgColor
}

export const leftPanelCss: any = {
  paddingRight: '30px',
  paddingLeft: '30px',
  paddingBottom: '20px',
  width: '25%',
  position: 'sticky',
  top: '20px'
}

export const rightPanelCss:any = {
  paddingTop: '20px',
  paddingLeft: '30px',
  paddingRight: '30px',
  paddingBottom: '20px',
  width: '60%',
  textAlign: 'left'
}

export const layoutCss = {
  width: '95%',
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center'
}