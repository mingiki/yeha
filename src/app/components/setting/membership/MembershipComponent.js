import React, { Component } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
} from "react-bootstrap-table2-paginator";

import {
    getSelectRow,
    getHandlerTableChange,
    NoRecordsFoundMessage,
    PleaseWaitMessage,
    sortCaret,
    headerSortingClasses,
} from "../../../helpers";


import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
  } from "../../../partials/controls";

import { Pagination } from "../../../partials/controls";

class MembershipComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns : [
                {
                  dataField: "id",
                  text: "ID",
                  sort: true,
                  sortCaret: sortCaret,
                  headerSortingClasses,
                },
                {
                  dataField: "firstName",
                  text: "Firstname",
                  sort: true,
                  sortCaret: sortCaret,
                  headerSortingClasses,
                },
                {
                  dataField: "lastName",
                  text: "Lastname",
                  sort: true,
                  sortCaret: sortCaret,
                  headerSortingClasses,
                },
                {
                  dataField: "email",
                  text: "Email",
                  sort: true,
                  sortCaret: sortCaret,
                  headerSortingClasses,
                },
                {
                  dataField: "gender",
                  text: "Gender",
                  sort: false,
                  sortCaret: sortCaret,
                },
                {
                  dataField: "status",
                  text: "Status",
                  sort: true,
                  sortCaret: sortCaret,
                //   formatter: columnFormatters.StatusColumnFormatter,
                  headerSortingClasses,
                },
                {
                  dataField: "type",
                  text: "Type",
                  sort: true,
                  sortCaret: sortCaret,
                //   formatter: columnFormatters.TypeColumnFormatter,
                },
                // {
                //   dataField: "action",
                //   text: "Actions",
                //   formatter: columnFormatters.ActionsColumnFormatter,
                //   formatExtraData: {
                //     openEditCustomerDialog: customersUIProps.openEditCustomerDialog,
                //     openDeleteCustomerDialog: customersUIProps.openDeleteCustomerDialog,
                //   },
                //   classes: "text-right pr-0",
                //   headerClasses: "text-right pr-3",
                //   style: {
                //     minWidth: "100px",
                //   },
                // },
            ],
            entities : [
                {
                    id: 1,
                    firstName: "Sonni",
                    lastName: "Gabotti",
                    email: "sgabotti0@wsj.com",
                    userName: "sgabotti0",
                    gender: "Female",
                    status: 0,
                    dateOfBbirth: "10/14/1950",
                    ipAddress: "251.237.126.210",
                    type: 1,
                    _userId: 1,
                    _createdDate: "09/07/2016",
                    _updatedDate: "05/31/2013"
                  },
                  {
                    id: 2,
                    firstName: "Abie",
                    lastName: "Cowperthwaite",
                    email: "acowperthwaite1@storify.com",
                    userName: "acowperthwaite1",
                    gender: "Male",
                    status: 1,
                    dateOfBbirth: "12/31/1998",
                    ipAddress: "239.176.5.218",
                    type: 1,
                    _userId: 2,
                    _createdDate: "03/18/2014",
                    _updatedDate: "08/17/2016"
                  },
                  {
                    id: 3,
                    firstName: "Melody",
                    lastName: "Stodd",
                    email: "mstodd2@twitpic.com",
                    userName: "mstodd2",
                    gender: "Female",
                    status: 0,
                    dateOfBbirth: "7/3/1957",
                    ipAddress: "14.80.25.15",
                    type: 1,
                    _userId: 1,
                    _createdDate: "07/03/2015",
                    _updatedDate: "01/28/2015"
                  },
                  {
                    id: 4,
                    firstName: "Naomi",
                    lastName: "Galbreth",
                    email: "ngalbreth3@springer.com",
                    userName: "ngalbreth3",
                    gender: "Female",
                    status: 2,
                    dateOfBbirth: "12/30/1976",
                    ipAddress: "239.198.18.122",
                    type: 0,
                    _userId: 2,
                    _createdDate: "06/22/2013",
                    _updatedDate: "01/31/2011"
                  },
                  {
                    id: 5,
                    firstName: "Ashley",
                    lastName: "Jandl",
                    email: "ajandl4@mapy.cz",
                    userName: "ajandl4",
                    gender: "Female",
                    status: 1,
                    dateOfBbirth: "11/23/1996",
                    ipAddress: "11.19.64.48",
                    type: 1,
                    _userId: 1,
                    _createdDate: "01/30/2018",
                    _updatedDate: "05/22/2014"
                  },
                  {
                    id: 6,
                    firstName: "Mildrid",
                    lastName: "Duplan",
                    email: "mduplan5@msn.com",
                    userName: "mduplan5",
                    gender: "Female",
                    status: 1,
                    dateOfBbirth: "4/21/1954",
                    ipAddress: "104.18.128.93",
                    type: 1,
                    _userId: 1,
                    _createdDate: "03/27/2011",
                    _updatedDate: "09/02/2015"
                  },
                  {
                    id: 7,
                    firstName: "Dall",
                    lastName: "Stow",
                    email: "dstow6@vistaprint.com",
                    userName: "dstow6",
                    gender: "Male",
                    status: 2,
                    dateOfBbirth: "4/14/1998",
                    ipAddress: "168.199.143.20",
                    type: 1,
                    _userId: 1,
                    _createdDate: "09/05/2011",
                    _updatedDate: "06/21/2012"
                  },
                  {
                    id: 8,
                    firstName: "Burton",
                    lastName: "Dering",
                    email: "bdering7@europa.eu",
                    userName: "bdering7",
                    gender: "Male",
                    status: 1,
                    dateOfBbirth: "8/15/1963",
                    ipAddress: "204.7.174.42",
                    type: 0,
                    _userId: 1,
                    _createdDate: "09/09/2017",
                    _updatedDate: "06/27/2011"
                  },
                  {
                    id: 9,
                    firstName: "Wolf",
                    lastName: "Blackaller",
                    email: "wblackaller8@biblegateway.com",
                    userName: "wblackaller8",
                    gender: "Male",
                    status: 0,
                    dateOfBbirth: "5/20/1997",
                    ipAddress: "12.229.194.195",
                    type: 0,
                    _userId: 1,
                    _createdDate: "07/16/2011",
                    _updatedDate: "05/24/2014"
                  },
                  {
                    id: 10,
                    firstName: "Adham",
                    lastName: "Hurtic",
                    email: "ahurtic9@friendfeed.com",
                    userName: "ahurtic9",
                    gender: "Male",
                    status: 1,
                    dateOfBbirth: "3/15/1971",
                    ipAddress: "236.147.173.25",
                    type: 0,
                    _userId: 2,
                    _createdDate: "03/25/2011",
                    _updatedDate: "12/13/2015"
                  },
                  {
                    id: 11,
                    firstName: "Carlina",
                    lastName: "Scudders",
                    email: "cscuddersa@shareasale.com",
                    userName: "cscuddersa",
                    gender: "Female",
                    status: 1,
                    dateOfBbirth: "2/18/1970",
                    ipAddress: "189.61.76.155",
                    type: 0,
                    _userId: 1,
                    _createdDate: "11/01/2015",
                    _updatedDate: "02/16/2013"
                  },
                  {
                    id: 12,
                    firstName: "Roderich",
                    lastName: "Landsberg",
                    email: "rlandsbergb@deliciousdays.com",
                    userName: "rlandsbergb",
                    gender: "Male",
                    status: 0,
                    dateOfBbirth: "12/7/1963",
                    ipAddress: "75.200.18.136",
                    type: 0,
                    _userId: 2,
                    _createdDate: "12/12/2017",
                    _updatedDate: "02/22/2013"
                  },
            ]
        };
    }

    componentDidMount () {
    }


    render() {
        let entities = this.state.entities;
        const paginationOptions = {
            custom: true,
            totalSize: this.state.entities.length,
            sizePerPageList: [
                { text: "3", value: 3 },
                { text: "5", value: 5 },
                { text: "10", value: 10 }
            ],
            sizePerPage: 10,
            page: 1,
          };

        return (
            <>  
                <Card>
                    <CardHeader title="Customers list">
                        <CardHeaderToolbar>
                        </CardHeaderToolbar>
                    </CardHeader>
                    <CardBody>
                        <PaginationProvider pagination={paginationFactory(paginationOptions)}>
                            {({ paginationProps, paginationTableProps }) => {
                            return (
                                <Pagination
                                  // isLoading={listLoading}
                                  paginationProps={paginationProps}
                                >
                                    <BootstrapTable
                                        wrapperClasses="table-responsive"
                                        bordered={false}
                                        classes="table table-head-custom table-vertical-center overflow-hidden"
                                        bootstrap4
                                        remote
                                        keyField="id"
                                        data={entities === null ? [] : entities}
                                        columns={this.state.columns}
                                        // defaultSorted={uiHelpers.defaultSorted}
                                        // onTableChange={getHandlerTableChange(
                                        // customersUIProps.setQueryParams
                                        // )}
                                        // selectRow={getSelectRow({
                                        // entities,
                                        // ids: customersUIProps.ids,
                                        // setIds: customersUIProps.setIds,
                                        // })}
                                        {...paginationTableProps}
                                    >
                                        {/* <PleaseWaitMessage entities={entities} />
                                        <NoRecordsFoundMessage entities={entities} /> */}
                                    </BootstrapTable>
                                </Pagination>
                            );
                            }}
                        </PaginationProvider>
                    </CardBody>
                </Card>
                
            </>         
        );
    }


}

export default MembershipComponent;

