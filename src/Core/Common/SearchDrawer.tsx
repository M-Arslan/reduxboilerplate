import React from 'react';
import styled from 'styled-components';
import {
    Drawer,
    IconButton,
    Button,
    List,
    ListItem,
    MenuItem
} from '@mui/material';
import {
    makeStyles
} from '@mui/styles';
import {
    ChevronLeft,
    ChevronRight,
    Search
} from '@mui/icons-material';

import { TextInput } from './TextInput';
import { SelectList } from './SelectList';
import { Spinner } from './Spinner';
import { ensureNonEmptyArray, ensureNonEmptyString, ensureNonNullObject } from '../Utilities/rules.';
import CSS from 'csstype';
import { SearchDrawerProps } from '../Utilities/types';


const drawerWidth = 450;

const useStyles = makeStyles((theme) => ({
    button: {
        margin: '1em',
    },
    formControl: {
        minWidth: 300,
    },
    selectControl: {
        width: '300px',
        margin: '0 auto',
    },
    root: {
        display: 'flex',
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        listStyle: 'none',
        listStyleType: 'none',
    },
    drawerPaper: {
        width: drawerWidth,
        top: '60px',
        height: 'calc(100% - 65px)',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 1em',
        // necessary for content to be below app bar
        justifyContent: 'flex-start',
        backgroundColor: '#bdc3c7',

    },
    content: {
        flexGrow: 1,
        padding: '3em',
        marginRight: -drawerWidth,
    },
    contentShift: {
        marginRight: 0,
    },
    dividerFullWidth: {
        margin: `5px 0 0 2em`,
    },
    dividerInset: {
        margin: `5px 0 0 9px`,
    },
    heading: {
        fontSize: '15px',
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: '15px',

    },
    expandedPanel: {
        margin: '0px !important'
    },
    panelDetails: {
        flexDirection: "column"
    }
}));


export const FieldContainer = styled.div`
    width: 100%;
    height: 50px;
    padding: .25em 1em;
    margin-bottom: .5em;
`;

const SearchField = styled.div`
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-content: center;
    margin-top: .5em;
`;

const ResultListItem = styled(ListItem)`
    cursor: pointer;
    transition: all .3s ease;

    &:hover {
        background-color: #dfdfdf;
        color: #000000;
    }

    &.selected {
        background-color: lightgreen;
    }

    &:hover > .Muiavatar-root {
        background-color: ${props => props.theme.primaryColor};
    }
`;

const DrawerContent = styled.article`
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    border: 0;

    display: flex;
    flex-flow: column nowrap;
`;

const DrawerHeader = styled.header`
    width: 100%;
    height: 45px;
    background-color: #bdc3c7;
    padding: 0 1em;

    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    border-bottom: solid 1px #c0c0c0;
`;

const DrawerFooter = styled.footer`
    width: ${drawerWidth};
    padding: 0 1em;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-content: center;
    align-items: center;
    border-top: #c0c0c0;
    gap:2; 
    bottom:0;
    position:fixed;    
    & > * {
        margin-left: 1em;
    }
`;

const DrawerMain = styled.main<CSS.Properties>`
    width: 100%;
    height: calc(100% - 90)}px);
    padding: 0;
    margin: 0;
    border: 0;

    overflow-x: hidden;
    overflow-y: hidden;

    display: flex;
    flex-flow: column nowrap;
`;

const DrawerMainFilters = styled.section`
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    align-content: flex-start;
    border-bottom: solid 1px #eaeaea;
    background-color: #efefef;
`;

const DrawerMainResults = styled.section`
    height: 100%;
    width: 100%;
    
    display: flex;
    flex-flow: column nowrap;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0;
    margin: 0;
    border: 0;
    background-color: #ffffff;
`;

const defaultOptions = Object.freeze({
    multiSelect: false,
    multiFilter: false,
    filterOptions: [],
    defaultFilter: '',
    noResultsMessages: {},
    autoSubmit: false,
    anchor: 'left',
});





export const SearchDrawer: React.FC<SearchDrawerProps> = ({ open, onResultSelected, onSearch, title = 'Search', options = {}, children }) => {

    const opts = { ...defaultOptions, ...options };
    const defaultType = (ensureNonEmptyString(opts.defaultFilter) ? opts.defaultFilter : (ensureNonEmptyArray(opts.filterOptions) ? opts.filterOptions[0].value : ''));

    const [isSearching, setIsSearching] = React.useState(false);
    const [hasSearched, setHasSearched] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const  [selectedItem,setSelectedItem] = React.useState(null);
    const [searchType, setSearchType] = React.useState(defaultType);
    const [searchResults, setSearchResults] = React.useState([]);
    const [searchTermError, setSearchTermError] = React.useState(false);

    const classes = useStyles();

    /**
     * Handles user input to the SearchTerm textfield
     * @param {any} evt
     */
    const onSearchTermChanged = (evt: any) => {
        setSearchTerm(evt.target.value);
        if(evt.target.value.length >= 3){
             setSearchTermError(false);
        }
    }


    /**
     * Return the results of the user's selection(s) and request the drawer be closed. 
     * @param {SelectionResult} result
     */
    const closeDrawer = (result: any) => {
        setSearchResults([]);
        setIsSearching(false);
        setSearchTerm('');
        setHasSearched(false);
        setSearchType(defaultType);

        if (typeof onResultSelected === 'function') {
            onResultSelected(result);
        }
    };

    /**
     * Execute the search callback and populate the search result pane
     */
    const doSearch = async (evt: any) => {
        evt.preventDefault();
        if(searchTerm.length < 3){
            setSearchTermError(true);
            return;
        }
        setIsSearching(true);
        let searchResult = [];

        try {
            searchResult = await onSearch(searchType,searchTerm);
        } catch (e) {
            searchResult = [];
            // console.error('[SearchDrawer::doSearch] error when executing search provider:', e);
        }

        setIsSearching(false);
        setHasSearched(true);
        setSearchResults(searchResult);
    };

    /**
     * Handles user selection of a result item
     * @param {any} result - the selected result object
     */
    const onSelectResult = (result: any) => {

        let tempArray:any = searchResults.map((x:any) => {
            if(x.brokerContactID === result.brokerContactID){
                x.selected = true;
                setSelectedItem(x);
            }else{
                x.selected = false;
            }
            return x;
        })
        setSearchResults(tempArray)
         
    };

    /**
     * Handles user cancellation interaction 
     */
    const cancel = () => {
        closeDrawer({ confirmed: false });
    }

    /**
     * Handles user acceptance interaction 
     */
    const submit = () => {
        closeDrawer({ confirmed: true, selected: ensureNonNullObject(selectedItem) ? selectedItem : null })
    }

    const onSearchTypeChanged = (evt:any) => {
        setSearchType(evt.target.value);
    };

    return (
        <Drawer
            className={classes.drawer}
            anchor={opts.anchor || 'right'}
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <DrawerContent>
                <DrawerHeader>
                    <IconButton name="arrowchevron_right" onClick={cancel}>
                        {(ensureNonEmptyString(opts.anchor) && opts.anchor === 'right' ? <ChevronRight /> :  <ChevronLeft />)}
                    </IconButton>
                    <span>{title}</span>
                </DrawerHeader>
                <DrawerMain>
                    <form onSubmit={doSearch}>
                        <DrawerMainFilters>
                            <FieldContainer style={(opts.multiFilter === true ? {} : { display: 'none' })}>
                                <SearchField>
                                    <SelectList
                                        id="searchType"
                                        name="searchType"
                                        label="Search Type"
                                        fullWidth={true}
                                        value={searchType}
                                        onChange={onSearchTypeChanged}
                                        variant="outlined"
                                        allowempty={false}
                                    >
                                        {
                                            (opts.filterOptions || [])
                                                .map((item:any, idx:any) => <MenuItem value={item.value} key={`search-option-${idx}`}>{item.label}</MenuItem>)
                                        }
                                    </SelectList>
                                </SearchField>
                            </FieldContainer>
                            <FieldContainer style={{ marginBottom: '.5em' }}>
                                <SearchField>
                                    <TextInput
                                        id="searchTerm"
                                        value={searchTerm}
                                        onChange={onSearchTermChanged}
                                        inputProps={{ 'maxLength': 255 }}
                                        error={searchTermError}
                                        helperText={searchTermError ? 'Minimum chars for search is 3' : ''}
                                    />
                                    <IconButton type="submit" size="small" disabled={isSearching === true}>
                                        <Search />
                                    </IconButton>
                                </SearchField>
                            </FieldContainer>
                        </DrawerMainFilters>
                    </form>
                    <DrawerMainResults>
                        {
                            isSearching === true ? <Spinner /> :
                                <List>
                                    {
                                        ensureNonEmptyArray(searchResults) ?
                                            searchResults.map((res: any, idx) => (
                                                <ResultListItem key={`result-${idx}`} className={`${res.selected ? 'selected' : ''}`} onClick={() => onSelectResult(res)}>
                                                    {children(res)}
                                                </ResultListItem>
                                            ))
                                            : <span style={{ padding: '1em' }}>{(hasSearched === true ? (opts.noResultsMessages[searchType] || 'No Results Found') : '')}</span>
                                    }
                                </List>
                        }

                    </DrawerMainResults>
                    
                </DrawerMain>
                <DrawerFooter style={(opts.multiSelect === true || opts.autoSubmit === false ? {} : { display: 'none' })} >
                    <Button name="search_cancel" onClick={cancel} sx={{background:'transparent'}}>
                        Cancel
                    </Button>
                    <Button name="search_submit" onClick={submit} sx={{background:'transparent'}}  disabled={ensureNonEmptyArray(searchResults) !== true}>
                        Submit
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}