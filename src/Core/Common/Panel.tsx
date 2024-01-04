import styled from 'styled-components';
import CSS from 'csstype';

const Panel = styled.section<CSS.Properties>`
    width: ${props => props.width || '100%'};
    min-height: ${props => props.minHeight || props.height || 'auto'};
    height: ${props => props.height || 'auto'};
    padding: ${props => props.padding || '0'};
    margin: ${props => props.margin || '0'};
    border: solid ${props => props.border || '1px'} ${props => props.theme.primaryColor};
    display: flex;
    flex-flow: column nowrap;
    overflow: ${props => (props.scrollBehavior ? 'auto' : 'visible')};
`;

const PanelHeader = styled.header<CSS.Properties>`
    width: 100%;
    height: 40px;
    padding: .5em;
    display: flex;
    flex-flow: row no-wrap;
    justify-content: space-between;
    align-content: center;
    border-bottom: solid 1px ${props => props.theme.onBackground};
    background-color: #1976d2;
    color: #fff;

    & > span {
        font-weight: normal;
        font-size: 14px;
    }
`;

const PanelTitle = styled.h2<CSS.Properties>`
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    padding: 0;
    margin: 0;
    border: 0;
`;

const PanelContent = styled.main<CSS.Properties>`
    height: 100%;
    width: 100%;
    padding: ${props => props.padding ? '1em' : '0'};
`;
const ContentRow = styled.div<CSS.Properties>`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    width: 100%;
`;

const ContentCell = styled.div<CSS.Properties>`
    width: ${props => props.width || '50%'};
    display: flex;
    flex-flow: ${props => props.flexDirection || 'row nowrap'};
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    padding: ${props => props.padding || '1em 1em 1em 1em'};
    

`;
const TabContainer = styled.article<CSS.Properties>`
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    border: 0;
    overflow-x: hidden;
    overflow-y: auto;
`;

const AppContainer = styled.section<CSS.Properties>`
    top:50px;
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    border: 0;
    overflow-x: hidden;
    overflow-y: hidden;
    display: flex;
    flex-flow: column nowrap;
    
`

const Toolbar = styled.nav<CSS.Properties>`
    width: 100%;
    height: auto;
    padding: 0;
    margin: 0;
    border: 0;
    border-top: solid 1px rgb(170, 170, 170);
    border-bottom: solid 1px rgb(170, 170, 170);
    background-color: ${props => props.theme.backgroundDark};
    background-color:rgb(237, 237, 237);

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-content: center;
    align-items: center;
`;
export { Panel, PanelHeader, PanelTitle, PanelContent,ContentRow,ContentCell,TabContainer,AppContainer,Toolbar };
